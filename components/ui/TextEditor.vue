<template>
  <div>
    <div v-if="editor" class="mb-4">
      <button class="border-2 rounded px-1" :class="{ 'bg-gray-200': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
        <font-awesome-icon icon="bold" />
      </button>
      <button class="border-2 rounded px-1" :class="{ 'bg-gray-200': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
        <font-awesome-icon icon="italic" />
      </button>
      <button class="border-2 rounded px-1" :class="{ 'bg-gray-200': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
        <font-awesome-icon icon="strikethrough" />
      </button>
      <button class="border-2 rounded px-1" :class="{ 'bg-gray-200': editor.isActive('code') }" @click="editor.chain().focus().toggleCode().run()">
        <font-awesome-icon icon="code" />
      </button>
      <button class="border-2 rounded px-1" title="clear marks" @click="editor.chain().focus().unsetAllMarks().run()">
        <font-awesome-icon icon="remove-format" />
      </button>
      <button class="border-2 rounded px-1" title="clear nodes" @click="editor.chain().focus().clearNodes().run()">
        <font-awesome-icon icon="eraser" />
      </button>
      <button class="border-2 rounded px-1" :class="{ 'bg-gray-200': editor.isActive('paragraph') }" @click="editor.chain().focus().setParagraph().run()">
        <font-awesome-icon icon="paragraph" />
      </button>
      <button class="border-2 rounded px-1" title="bullet list" :class="{ 'bg-gray-200': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">
        <font-awesome-icon icon="list-ul" />
      </button>
      <button class="border-2 rounded px-1" title="ordered list" :class="{ 'bg-gray-200': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()">
        <font-awesome-icon icon="list-ol" />
      </button>
      <button class="border-2 rounded px-1" title="code block" :class="{ 'bg-gray-200': editor.isActive('codeBlock') }" @click="editor.chain().focus().toggleCodeBlock().run()">
        <font-awesome-icon icon="file-code" />
      </button>
      <button class="border-2 rounded px-1" title="blockquote" :class="{ 'bg-gray-200': editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()">
        <font-awesome-icon icon="quote-right" />
      </button>
      <button class="border-2 rounded px-1" title="hard break" @click="editor.chain().focus().setHardBreak().run()">
        <font-awesome-icon icon="redo-alt" class="transform rotate-180" />
      </button>
      <button class="border-2 rounded px-1" @click="editor.chain().focus().setHorizontalRule().run()">
        <span class="inline-block w-4 h-1 bg-black align-middle -mt-1" />
      </button>
      <button class="border-2 rounded px-1" title="undo" @click="editor.chain().focus().undo().run()">
        <font-awesome-icon icon="undo" />
      </button>
      <button class="border-2 rounded px-1" title="redo" @click="editor.chain().focus().redo().run()">
        <font-awesome-icon icon="redo" />
      </button>
    </div>
    <editor-content :editor="editor" class="focus:outline-none" />
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBold, faItalic, faStrikethrough, faCode, faRemoveFormat, faEraser, faParagraph, faListUl, faListOl, faFileCode, faQuoteRight, faUndo, faRedo, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'

library.add(faBold, faItalic, faStrikethrough, faCode, faRemoveFormat, faEraser, faParagraph, faListUl, faListOl, faFileCode, faQuoteRight, faUndo, faRedo, faRedoAlt)

export default {
  components: { EditorContent, FontAwesomeIcon },

  props: {
    value: { type: String, required: true },
    placeholder: { type: String, default: '' },
  },

  data () {
    return {
      editor: null,
    }
  },

  watch: {
    value (value) {
      // HTML
      const isSame = this.editor.getHTML() === value
      if (isSame) { return }

      this.editor.commands.setContent(this.value, false)
    },
  },

  mounted () {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Placeholder.configure({ placeholder: this.placeholder }),
        Link.configure({ openOnClick: false }),
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
    })
  },

  beforeDestroy () {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror, .rich-editor-text {
  > * + * {
    margin-top: 0.75em;
  }

  &-focused {
    outline: none;
  }

  ul,
  ol {
    padding: 0 0 0 1.5rem;
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  strong {
    font-weight: bold;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}

/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}
</style>
