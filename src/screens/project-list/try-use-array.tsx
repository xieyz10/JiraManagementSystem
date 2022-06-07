import { useArray, useMount } from "../../utils";
import React from "react";

const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);
  useMount(() => {});
  return (
    <div>
      <button onClick={() => add({ name: "jim", age: 22 })}>add Jim</button>
      <button onClick={() => removeIndex(0)}>delete person</button>
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear array
      </button>
      {value.map((person: { name: string; age: number }, index: number) => (
        <div style={{ marginBottom: "30px" }}>
          <span style={{ color: "red" }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};

export default TsReactTest;
