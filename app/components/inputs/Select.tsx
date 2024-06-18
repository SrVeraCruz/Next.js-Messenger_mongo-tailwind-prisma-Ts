"use client"

import ReactSelect, { MultiValue } from "react-select"

interface SelectOption {
  value: string,
  label: string
}

interface SelectProps {
  disabled?: boolean,
  label: string,
  options: SelectOption[],
  onChange: (value: MultiValue<SelectOption> ) => void,
  value?: { value: string, label: string }
}

export default function Select({
  disabled,
  label,
  options,
  onChange,
  value,
}: SelectProps ) {
  return (
    <div className="z-[100]">
      <label 
        className="block text-sm font-medium leading-6
          text-gray-900
        "
      >
        {label}
      </label>

      <div className="mt-2">
        <ReactSelect 
          isDisabled={disabled}
          value={value}
          options={options}
          onChange={onChange}
          isMulti
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999
            })
          }}
          classNames={{
            control: () => "text-sm capitalize",
            option: () => "capitalize"
          }}
        />
      </div>
    </div>
  )
}