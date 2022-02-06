export default function TextBlock({ data, name }) {
  return (
    <span dangerouslySetInnerHTML={{__html:
      data.find(textBlock => textBlock.name === name)?.html || ''}}
    />
  )
}
