import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
  NodeProps,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CourseDto } from '../services/api';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';

type StepStatus = 'completed' | 'current' | 'locked';

type LearningStepData = Record<string, unknown> & {
  course: CourseDto;
  status: StepStatus;
  progressPct: number;
};

type CourseNodeType = Node<LearningStepData, 'courseNode'>;

// Custom Node Component
export const CustomCourseNode = ({ data }: NodeProps<CourseNodeType>) => {
  const { course, status, progressPct } = data;

  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';

  let bgClass = 'bg-gray-100 text-gray-400 border-gray-200';
  let icon = 'lock';
  
  if (isCompleted) {
    bgClass = 'bg-green-500 text-white border-green-600';
    icon = 'check_circle';
  } else if (isCurrent) {
    bgClass = 'bg-white text-gray-800 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)] animate-pulse';
    icon = 'play_circle';
  }

  return (
    <div className={`px-4 py-3 shadow-md rounded-md border-2 w-[220px] transition-all hover:scale-105 ${bgClass} ${status === 'locked' ? 'opacity-60' : 'opacity-100'}`}>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
        <div className="flex flex-col min-w-0">
          <div className="text-sm font-bold truncate leading-tight" title={course.title}>
            {course.title}
          </div>
          <div className="text-[10px] uppercase font-semibold mt-1 opacity-80">
            {course.level || 'Course'} • {progressPct}%
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  );
};

const nodeTypes = {
  courseNode: CustomCourseNode,
};

interface RoadmapGraphProps {
  steps: any[];
}

const RoadmapGraph = ({ steps }: RoadmapGraphProps) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseDto | null>(null);

  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: any[] = [];
    const edges: any[] = [];

    steps.forEach((step, index) => {
      const pct = step.progress?.progressPercentage ?? 0;
      nodes.push({
        id: step.course.id,
        type: 'courseNode',
        position: { x: index * 320, y: 150 }, // Xếp ngang cách nhau một đoạn
        className: 'hover:cursor-pointer',
        data: {
          course: step.course,
          status: step.status,
          progressPct: pct,
        },
      });

      if (index < steps.length - 1) {
        // Nối Edge tới node tiếp theo
        edges.push({
          id: `e-${step.course.id}-${steps[index + 1].course.id}`,
          source: step.course.id,
          target: steps[index + 1].course.id,
          animated: step.status === 'completed' || step.status === 'current', // Animated flow
          style: { stroke: step.status === 'completed' ? '#22c55e' : (step.status === 'current' ? '#eab308' : '#94a3b8'), strokeWidth: 3 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: step.status === 'completed' ? '#22c55e' : (step.status === 'current' ? '#eab308' : '#94a3b8'),
          },
        });
      }
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [steps]);

  // Hook states cho React Flow
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync state nếu mảng courses bị load lại
  useMemo(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    setSelectedCourse(node.data.course);
  }, []);

  return (
    <div style={{ height: '500px', width: '100%', border: '1px solid #e2e8f0', borderRadius: '16px', background: '#f8fafc', overflow:'hidden' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        <MiniMap zoomable pannable nodeColor={(node) => {
            if (node.data?.status === 'completed') return '#22c55e';
            if (node.data?.status === 'current') return '#eab308';
            return '#cbd5e1';
        }} />
        <Controls />
        <Background gap={16} size={1} color="#cbd5e1"/>
      </ReactFlow>

      {/* Modal Info */}
      <Dialog open={!!selectedCourse} onClose={() => setSelectedCourse(null)} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center bg-gray-50 border-b p-4">
          <span className="font-bold text-gray-800 text-lg line-clamp-1">{selectedCourse?.title}</span>
          <IconButton onClick={() => setSelectedCourse(null)} size="small">
            <span className="material-symbols-outlined">close</span>
          </IconButton>
        </DialogTitle>
        <DialogContent className="p-0">
          {selectedCourse?.thumbnailUrl ? (
            <img src={selectedCourse.thumbnailUrl} alt="Cover" className="w-full h-56 object-cover" />
          ) : (
            <div className="w-full h-24 bg-gradient-to-r from-blue-50 to-indigo-50"></div>
          )}
          <div className="p-6 space-y-4">
            <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full text-xs uppercase">{selectedCourse?.level}</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-semibold rounded-full text-xs uppercase">{selectedCourse?.category}</span>
            </div>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedCourse?.description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoadmapGraph;
