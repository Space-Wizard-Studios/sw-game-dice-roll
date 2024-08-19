import { createEffect, onCleanup, onMount } from 'solid-js';
import type { Component } from 'solid-js';

import { gameState } from '@stores/GameStateStore';
import { DialogueMessage, dialogueStore } from '@stores/DialogueStore';

type DialogueProps = {
  message: DialogueMessage;
};

export const Dialogue: Component<DialogueProps> = () => {
  let messagesContainer: HTMLDivElement | undefined;

  const scrollToBottom = () => {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  onMount(scrollToBottom);
  
  createEffect(() => {
    dialogueStore.messages;
    scrollToBottom();
  });

  return (
    <div class='flex flex-col flex-1 h-full p-2 gap-2 rounded-md bg-gray-500 bg-opacity-50'>
      <div class='flex flex-row justify-between'>
        <h2>Dialogue</h2>
        <h3>Phase: {gameState.currentPhase}</h3>
      </div>
      <div
        ref={messagesContainer}
        class='flex flex-col p-2 gap-2 h-full overflow-y-auto bg-black bg-opacity-25 border-2 rounded-md border-black border-opacity-50'
      >
        {dialogueStore.messages.map(message => {

          let bg = '';
          switch (message.type) {
            case 'info':
              bg = 'bg-blue-500';
              break;
            case 'failure':
              bg = 'bg-red-500';
              break;
            case 'success':
              bg = 'bg-green-500';
              break;
            default:
              bg = 'bg-gray-500';
              break;
          }

          return (
            <div class={`p-1 rounded-md ${bg} bg-opacity-50`}>
              {message.lines.map(line => (
                <p>{line.text}</p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};