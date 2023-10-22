type ProbabilitiesBreakdownProps = {
  probabilities: {
    [key: string]: number;
  };
};

export default function ProbabilitiesBreakdown({
  probabilities,
}: ProbabilitiesBreakdownProps) {
  // TODO: implement this in Results
  return (
    <div>
      <div>Jarlsberg: {Math.floor(probabilities.jarlsberg * 100)}%</div>
      <div>Kvarg: {Math.floor(probabilities.kvarg * 100)}%</div>
    </div>
  );
}
