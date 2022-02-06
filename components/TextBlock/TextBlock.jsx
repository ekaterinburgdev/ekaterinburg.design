export default function TextBlock({ data, name }) {
  return (
    <div dangerouslySetInnerHTML={{__html:
      data.find(textBlock => textBlock.name === name)?.html || ''}}
    />
  )
}
