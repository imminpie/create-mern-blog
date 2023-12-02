import MDEditor, { commands } from '@uiw/react-md-editor';
import { useRef, useState, useCallback } from 'react';
import * as editHelper from '../util/edit.js';

export default function MyEditor({ content, setContent }) {
  const inputRef = useRef(null);
  const editorRef = useRef(null);
  const textApiRef = useRef(null);
  const [insertImg, setInsertImg] = useState('');

  const inputImageHandler = useCallback(async (event) => {
    if (event.target.files && event.target.files.length === 1) {
      setInsertImg('');
      await editHelper.onImageUpload(event.target.files[0], textApiRef.current);
    }
  }, []);

  return (
    <>
      <input ref={inputRef} className='inputFile hidden' type='file' accept='.jpg,.png,.jpeg,.gif,.svg' name='avatar' value={insertImg} onChange={inputImageHandler} />
      <div className='relative'>
        <MDEditor
          ref={editorRef}
          value={content}
          onChange={(e) => setContent(e)}
          commands={[
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.hr,
            commands.group([commands.title1, commands.title2, commands.title3, commands.title4, commands.title5, commands.title6], {
              name: 'title',
              groupName: 'title',
              buttonProps: { 'aria-label': 'Insert title' },
            }),
            commands.divider,
            commands.link,
            commands.quote,
            commands.code,
            commands.codeBlock,
            commands.comment,
            ...editHelper.editChoice(inputRef, textApiRef),
            commands.table,
            commands.divider,
            commands.unorderedListCommand,
            commands.orderedListCommand,
            commands.checkedListCommand,
            commands.divider,
            commands.help,
          ]}
          extraCommands={[commands.codeLive, commands.codePreview, commands.fullscreen]}
          textareaProps={{ placeholder: '내용을 입력하세요', name: 'content' }}
          height='calc(100vh - 340px)'
        />
      </div>
    </>
  );
}
