import React, { useCallback, useRef } from 'react'
import { useTxStatus } from '@alephium/web3-react'
import { node } from "@alephium/web3"
import Link from 'next/link'
import { getExplorerUrl } from '@/services/utils'

interface TxStatusAlertProps {
  txId: string
  txStatusCallback(status: node.TxStatus, numberOfChecks: number): Promise<any>
}

export const TxStatus = ({ txId, txStatusCallback }: TxStatusAlertProps) => {
  const numberOfChecks = useRef(0)
  const callback = useCallback(async (status: node.TxStatus) => {
    numberOfChecks.current += 1
    return txStatusCallback(status, numberOfChecks.current)
  }, [txStatusCallback, numberOfChecks])

  const { txStatus } = useTxStatus(txId, callback)

  return (
    <>
    
      <h6 style={{ margin: "1em" }}>
        Transaction status: <code>{txStatus?.type || 'unknown'}</code>
      </h6>
      <h6 style={{ margin: 0 }}>
        Transaction hash: <code><Link href={getExplorerUrl()+"/transactions/"+txId} rel="noopener noreferrer" target="_blank">{txId.slice(0,20)+"..."}</Link></code>
      </h6>
    </>
  )
}
