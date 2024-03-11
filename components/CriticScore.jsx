import { Badge } from "@chakra-ui/react";

const CriticScore = ({ popularity }) => {
  let color = popularity > 50 ? "green" : popularity > 30 ? "yellow" : "red";
  return (
    <Badge colorScheme={color} fontSize="14px" paddingX={2} borderRadius="4px">
      {(popularity * 1)?.toFixed(1)}
    </Badge>
  );
};

export default CriticScore;
