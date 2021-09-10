import React from "react";
import { List, Message } from "semantic-ui-react";

interface Props {
  errors: string[] | null;
}

export default function ValidationErrors({ errors }: Props) {
  return (
    <Message error>
      {errors && (
        <List>
          {errors.map((err: any, i) => (
            <List.Item key={i}>{err}</List.Item>
          ))}
        </List>
      )}
    </Message>
  );
}
