import { WorkflowContext } from '@/context/WorkflowContext'
import React, { useContext } from 'react'
import AgentSettings from '../_nodeSetting/AgentSettings';
import EndSetting from '../_nodeSetting/EndSetting';
import IfElseSetting from '../_nodeSetting/IfElseSetting';
import WhileSetting from '../_nodeSetting/WhileSetting';
import UserApprovalSetting from '../_nodeSetting/UserApprovalSetting';
import ApiSetting from '../_nodeSetting/ApiSetting';

export default function SettingPanel() {
  const { selectNode, setAddedNodes } = useContext(WorkflowContext)



  const onUpdatedNodeData = (formData: any) => {

    const updateNode = {
      ...selectNode,
      data: {
        ...selectNode.data,
        label: formData?.name,
        settings: formData
      }
    }
    setAddedNodes((prevNode: any) => prevNode.map((node: any) => node.id === selectNode.id ? updateNode : node))
  }
  return selectNode && (
    <div className='p-5 rounded-2xl shadow w-[350px] bg-white'>
      {selectNode?.type == "AgentNode" && <AgentSettings selectNode={selectNode} updateFormData={(value: any) => onUpdatedNodeData(value)} />}
      {selectNode.type === "EndNode" && <EndSetting selectNode={selectNode} updateFormData={(value: any) => onUpdatedNodeData(value)} />}
      {selectNode.type === "IfElseNode" && <IfElseSetting selectNode={selectNode} updateFormData={(value: any) => onUpdatedNodeData(value)} />}
      {selectNode.type === "WhileNode" && <WhileSetting selectNode={selectNode} updateFormData={(value: any) => onUpdatedNodeData(value)} />}
      {selectNode.type === "UserApprovalNode" && <UserApprovalSetting selectNode={selectNode} updateFormData={(value: any) => onUpdatedNodeData(value)} />}
      {selectNode.type === "ApiNode" && <ApiSetting selectNode={selectNode} updateFormData={(value: any) => onUpdatedNodeData(value)} />}
    </div>
  )
}
