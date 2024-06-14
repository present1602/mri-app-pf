
export const SymbolButton:any = ({symbolKey}:any) =>{
  switch(symbolKey){
    case "CASymbol1":
      return (
        <svg width="10" height="10" viewBox="0 0 10 10" style={{margin:'auto'}} >
          <circle cx="5" cy="5" r="4" fill="none" stroke="black" strokeWidth="1"/>
        </svg>
      )
    case "CASymbol2":
      return (
        <svg width="10" height="10" viewBox="0 0 10 10" style={{margin:'auto'}} >
          <polygon points="5 0, 10 10, 0 10" stroke="black" fill="none" />
        </svg>
      )
    case "CASymbol3":
      return (
        <svg width="10" height="10" viewBox="0 0 10 10" style={{margin:'auto'}} >
          <circle cx="5" cy="5" r="4" fill="none" stroke="black" strokeWidth="1"/>
          <circle cx="5" cy="5" r="2" fill="none" stroke="black" strokeWidth="1"/>
        </svg>
      )
    case "CASymbol4":
      return (
        <svg width="10" height="10" viewBox="0 0 10 10" style={{margin:'auto'}} >
          <polygon points="5 0, 10 10, 0 10" stroke="black" fill="none" />
          <polygon points="5 1, 8 8, 2 8" stroke="black" fill="none" />
        </svg>
      )
    default:
      return null
  }
}