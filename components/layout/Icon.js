import { Box } from "rebass";

export default function Icon({ icon, ...props }) {
  return (
    <Box {...props} >
      <i className={icon}></i>
    </Box>
  );
}