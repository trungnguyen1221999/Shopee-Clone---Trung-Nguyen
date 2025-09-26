
const rules = () => {
  return (
    <div>
      
    </div>
  )
}

export default rules

interface RulePropType {
    email{
        required: string;
        pattern: {
            value: RegExp;
            message: string;
        };
    }

}