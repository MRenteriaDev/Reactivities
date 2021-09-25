import React from "react";
import { List, Message } from "semantic-ui-react";

interface Props {
  errors: any;
}

export default function ValidationErrors({ errors }: Props) {
  return (
    <Message error>
      {errors && (
        <List>
          {errors.map((err: any, i: any) => (
            <List.Item key={i}>{err}</List.Item>
          ))}
        </List>
      )}
    </Message>
  );
}
