'use client'

import { Button } from '~/components/ui/button'
import { Column } from './column'
import { Grid } from './grid'
import { Modal, ModalProps } from './modal'

type WarningModalProps = Pick<ModalProps, 'children' | 'title' | 'isOpen' | 'onOpenChange'> & {
  onConfirm: () => void
  loading: boolean
}

export function WarningModal({ title, children, onConfirm, loading, isOpen, onOpenChange }: WarningModalProps) {
  return (
    <Modal title={title} description="" trigger={children} onOpenChange={onOpenChange} isOpen={isOpen}>
      <Grid>
        <Column size={12} className="pb-8 pt-2 text-muted-foreground">
          Are you sure? This action can not be reverted.
        </Column>
        <Column size={12} className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" loading={loading} onClick={onConfirm}>
            Yes, I confirm!
          </Button>
        </Column>
      </Grid>
    </Modal>
  )
}
