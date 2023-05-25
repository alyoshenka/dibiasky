import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

export default function UpdateDisplay() {
  const [inputs, setInputs] = useState({
    boardMessage: '',
    speed: false,

  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
        <TextField
          name="boardMessage"
          value={inputs.boardMessage}
          onChange={handleChange}
          type="text"
          sx={{ m: 3 }}
          placeholder="Input Message"
          variant="standard"
        />
        <FormGroup>
          <FormControlLabel
            control={(
              <Checkbox onChange={() => setInputs((prev) => ({
                ...prev, speed: !inputs.speed,
              }))}
              />
              )}
            label="Slow"
          />
          <FormControlLabel required control={<Checkbox />} label="Medium" />
          <FormControlLabel disabled control={<Checkbox />} label="Fast" />
        </FormGroup>
        <Button type="submitUpdate">Update Display</Button>
      </form>
    </div>
  );
}
