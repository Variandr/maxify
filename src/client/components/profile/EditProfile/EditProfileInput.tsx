interface Props {
  heading: string
  placeholder: string
  value: string | number | readonly string[] | undefined
  onChangeAction: any
}

const EditProfileInput = ({
  heading,
  placeholder,
  value,
  onChangeAction,
}: Props) => {
  return (
    <div className="flex flex-col mt-4">
      <label>{heading}</label>
      <input
        value={value}
        type="text"
        className="rounded outline-0 px-3 py-1 dark:text-white bg-transparent"
        style={{ border: '1px solid gray' }}
        placeholder={placeholder}
        onChange={(e) => onChangeAction(e.target.value)}
      />
    </div>
  )
}

export default EditProfileInput
