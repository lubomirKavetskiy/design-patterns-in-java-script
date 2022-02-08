function Factory(props) {
  switch (props.component.type) {
    case 'A':
      return <A />;
    case 'B':
      return <B />;
    case 'C':
      return <C />;
    default:
      return <div>Reload...</div>;
  }
}

return (
  <div>
    {cards.map((card) => (
      <Factory component={card} />
    ))}
  </div>
);
