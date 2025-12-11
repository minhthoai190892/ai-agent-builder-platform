"use client"
import { useState, useCallback, useContext, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap, Panel, useOnSelectionChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import AgentBuilderHeader from '../_components/AgentBuilderHeader';
import StartNode from '../_customNdoes/StartNode';
import AgentNode from '../_customNdoes/AgentNode';
import AgentToolsPanel from '../_components/AgentToolsPanel';
import { WorkflowContext } from '@/context/WorkflowContext';
import EndNode from '../_customNdoes/EndNode';
import { useConvex, useMutation, useQueries, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Agent } from '@/utils/Agent';
import { query } from '@/convex/_generated/server';
import { Button } from '@/components/ui/button';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import IfElseNode from '../_customNdoes/IfElseNode';
import WhileNode from '../_customNdoes/WhileNode';
import UserApprovalNode from '../_customNdoes/UserApprovalNode';
import ApiNode from '../_customNdoes/ApiNode';
import SettingPanel from '../_components/SettingPanel';
import { OnSelectionChangeParams } from '@xyflow/react';
const initialNodes = [
    { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' }, type: 'StartNode', },
    { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' }, type: 'AgentNode', },
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];


const nodeTypes = {
    StartNode: StartNode,
    AgentNode: AgentNode,
    EndNode: EndNode,
    IfElseNode: IfElseNode,
    WhileNode: WhileNode,
    UserApprovalNode: UserApprovalNode,
    ApiNode: ApiNode

};
export default function AgentBuilder() {
    const [nodes, setNodes] = useState([{ id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' }, type: 'StartNode', },]);
    const [edges, setEdges] = useState([]);
    const agentId = useParams()
    const [agentDetail, setAgentDetail] = useState<Agent>()
    const [loading, setLoading] = useState<boolean>(false)

    const updateAgentDetail = useMutation(api.agent.updateAgentDetail)


    const { addedNodes, setAddedNodes, nodeEdges, setNodeEdges, selectNode, setSelectNode } = useContext(WorkflowContext)
    const convex = useConvex()
    const getAgentDetail = async () => {

        const result = await convex.query(api.agent.getAgentById, {
            agentId: agentId.agentId as Id<"AgentTable">
        })
        setAgentDetail(result);

    }
    // const onNodeSelect = useCallback(({ nodes, edges }: OnSelectionChangeParams) => {

    // }, [])

    const saveNodesAndEdges = async () => {

        try {
            setLoading(true)
            const result = await updateAgentDetail({
                // @ts-ignore
                id: agentDetail?._id,
                edges: nodeEdges,
                nodes: addedNodes
            })
            toast.success("Save Agent Success")
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)

        }

    }

    useEffect(() => {
        getAgentDetail()
    }, [])

    useEffect(() => {
        if (agentDetail) {
            setNodes(agentDetail.nodes)
            setEdges(agentDetail.edges)
            setAddedNodes(agentDetail.nodes)
            setNodeEdges(agentDetail.edges)
        }
        // addedNodes && setNodes(addedNodes)
        // nodeEdges && setEdges(nodeEdges)
    }, [agentDetail])
    useEffect(() => {
        addedNodes && setNodes(addedNodes)

    }, [addedNodes])
    useEffect(() => {
        edges && setNodeEdges(edges)

    }, [edges])
    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => {

            const updated = applyNodeChanges(changes, nodesSnapshot)
            setAddedNodes(updated)
            return updated
        }),
        [setAddedNodes],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        // @ts-ignore
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );
    const onNodeSelect = useCallback(
        ({ nodes, edges }: OnSelectionChangeParams) => {
            console.log("Selected nodes:", nodes);
            console.log("Selected edges:", edges);

            // Nếu muốn lấy node đang được chọn
            // const selectedNode = nodes?.[0];/
            setSelectNode(nodes[0])

            console.log(nodes[0]);
        },
        []
    );

    useOnSelectionChange({
        onChange: onNodeSelect
    })
    return (
        <div>
            <AgentBuilderHeader agentDetail={agentDetail} />
            <div style={{ width: '100vw', height: '90vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    nodeTypes={nodeTypes}
                >

                    <Background />
                    <Controls />
                    <MiniMap />
                    <Panel position='top-left'>
                        <AgentToolsPanel />
                    </Panel>
                    <Panel position='top-right'>
                        <SettingPanel />
                    </Panel>
                    <Panel position='bottom-center'>
                        <Button className='cursor-pointer ' disabled={loading} onClick={saveNodesAndEdges}>{loading ? <Loader2 className='animate-spin' /> : "Save"}</Button>
                    </Panel>
                </ReactFlow>
            </div>
        </div>
    );
}