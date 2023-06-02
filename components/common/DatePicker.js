import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

const DatePickers = (props) => {
    const [value, setValue] = useState();
  
    useEffect(()=>{
     if(value)
      props.dateHandler(value.toDate())
  
      
  
    },[value])
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label=""
        value={value}
        disablePast={true}
        disableHighlightToday={true}
        closeOnSelect={true}
        minDate={new Date()}
        className="text-white  bg-tertiaryblue-100  py-0 focus:outline-none rounded-lg font-title w-[100%]  text-sm font-bold "
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params}  sx={{
            svg: { color: '#fff' },
              input: { color: '#fff'},
              label:{ color: '#fff' },
             
          }} />}
      />
    </LocalizationProvider>
  );
};
export default DatePickers
