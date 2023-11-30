import { Autocomplete, CircularProgress, TextField } from "@mui/material";

// INTERFACES
import { IAutoCompleteProps } from "../../interfaces/app";

interface ICustomAutoCompleteProps {
  isLoading: boolean;
  label: string;
  options: IAutoCompleteProps[];
  value: IAutoCompleteProps | null;
  onChange: (value: IAutoCompleteProps | null) => void;
}

export const CustomAutoComplete = ({
  isLoading,
  label,
  options,
  value,
  onChange,
}: ICustomAutoCompleteProps) => {
  return (
    <Autocomplete
      value={value}
      onChange={(_event, newInputValue: IAutoCompleteProps | null) =>
        onChange(newInputValue ?? null)
      }
      loading={isLoading}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
