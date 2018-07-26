import isWhitespace from 'is-whitespace'

export default class TextToLinks {
  constructor (quill, options) {
    this.quill = quill
    this.options = options

    this.matches = [
      {
        name: 'link',
        pattern: /https?:\/\/[^\s]+$/g,
        action: (text, pattern, endRetain) => {
          const url = text.match(pattern)[0]
          var ops = [];
          
          if(endRetain > url.length) {
            ops.push({ retain: endRetain - url.length });
          }

          ops = ops.concat([
            { delete: url.length },
            { insert: url, attributes: { link: url } }
          ]);

          this.quill.updateContents({
            ops: ops
          });
        }
      },
      {
        name: 'mailto',
        pattern: /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
        action: (text, pattern, endRetain) => {
          const url = text.match(pattern)[0]
          var ops = [];
                    
          if(endRetain > url.length) {
            ops.push({ retain: endRetain - url.length });
          }

          ops = ops.concat([
            { delete: url.length },
            { insert: url, attributes: { link: 'mailto:' + url } }
          ]);

          this.quill.updateContents({
            ops: ops
          });
        }
      }
    ]

    this.quill.on('text-change', (delta, oldContents, source) => {
      if(delta.ops.length === 2 && delta.ops[0].retain && isWhitespace(delta.ops[1].insert)) {
        var endRetain = delta.ops[0].retain
        var text = quill.getText().substr(0, endRetain)

        for (let match of this.matches) {
          const matchedText = text.match(match.pattern)
          if (matchedText) {
            match.action(text, match.pattern, endRetain)
            return
          }
        }
      }
    })
  }
}

module.exports = TextToLinks