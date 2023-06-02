import {MobileTimePicker} from '@mui/x-date-pickers';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
const TimePickers = (props) => {
    const [value, setValue] = useState();
  
    useEffect(()=>{
     if(value)
      props.timeHandler(value)
  
      
  
    },[value])
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileTimePicker
        label=""
        value={value}
        defaultValue={value}
        className="py-0 focus:outline-none rounded-lg font-title w-[100%]  text-sm font-bold "
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params}  />}
      />
    </LocalizationProvider>
  );
};
export default TimePickers
