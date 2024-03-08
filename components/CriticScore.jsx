import { Badge } from "@chakra-ui/react";


const CriticScore = ({ popularity }) => {
  let color = popularity*1.7 > 50 ? "green" : popularity*1.7 > 30 ? "yellow" : "red";
  return (
    <Badge colorScheme={color} fontSize="14px" paddingX={2} borderRadius="4px">
      {(popularity*1.7)?.toFixed(2)}
    </Badge>
  );
};

export default CriticScore;
