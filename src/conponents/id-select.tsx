import { Select } from "antd";
import React from "react";
import { Raw } from "types";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value?: Raw | null | undefined;
  onChange?: (value?: number) => void;
  defaultOpitionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * value 可以传入多种类型的值
 * onChange只会回调 number|undefined 类型
 * 当isNaN(Number(value))为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 * @constructor
 */

// onChange={(value: number | undefined) => {
//     setParam({
//         ...param,
//         personId: value
//     })
// }}

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOpitionName, options, ...restProps } = props;

  const handleChangeItem = (value: unknown) => {
    onChange?.(toNumber(value) || undefined);
  };

  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      // onChange={value=>{onChange(toNumber(value)||undefined)}}
      onChange={handleChangeItem}
      {...restProps}
    >
      {defaultOpitionName ? (
        <Select.Option value={0}>{defaultOpitionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
