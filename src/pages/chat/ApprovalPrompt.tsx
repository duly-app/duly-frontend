import { FilePlus2Icon, PencilIcon, Trash2Icon, WrenchIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupTextarea } from '@/components/ui/input-group';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Spinner } from '@/components/ui/spinner';
import type { PendingAction } from '@/features/chat/api/chat';

interface ApprovalPromptProps {
  actions: PendingAction[];
  disabled: boolean;
  onDecide: (approved: boolean, reason?: string) => void;
}

const ACTIONS: Record<string, { verb: string; icon: typeof WrenchIcon }> = {
  create_note: { verb: 'Create a note', icon: FilePlus2Icon },
  update_note: { verb: 'Update a note', icon: PencilIcon },
  delete_note: { verb: 'Delete a note', icon: Trash2Icon },
};

function headline(action: PendingAction): string {
  const { verb } = ACTIONS[action.name] ?? { verb: action.name };
  const title = action.input.title;

  return typeof title === 'string' && title ? `${verb}: ${title}` : verb;
}

/** What the tool was asked to do, so a yes means yes to this and not to a verb. */
function details(action: PendingAction): string {
  return Object.entries(action.input)
    .filter(([key, value]) => key !== 'title' && value !== null && value !== '')
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join('\n');
}

export default function ApprovalPrompt({ actions, disabled, onDecide }: ApprovalPromptProps) {
  const [reason, setReason] = useState('');

  if (actions.length === 0) return null;

  return (
    <ItemGroup className="rounded-lg border">
      {actions.map((action) => {
        const { icon: Icon } = ACTIONS[action.name] ?? { icon: WrenchIcon };
        const detail = details(action);

        return (
          <Item key={action.tool_use_id} size="sm">
            <ItemMedia variant="icon">
              <Icon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{headline(action)}</ItemTitle>
              {detail && (
                <ItemDescription className="line-clamp-4 whitespace-pre-line">
                  {detail}
                </ItemDescription>
              )}
            </ItemContent>
          </Item>
        );
      })}

      <InputGroup>
        <InputGroupTextarea
          placeholder="Instead, tell Duly what to do"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          disabled={disabled}
          aria-label="Reason for denying"
        />
        <InputGroupAddon align="block-end" className="justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={() => onDecide(false, reason.trim() || undefined)}
          >
            Deny
          </Button>
          <Button size="sm" disabled={disabled} onClick={() => onDecide(true)}>
            {disabled && <Spinner data-icon="inline-start" />}
            Approve
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </ItemGroup>
  );
}
