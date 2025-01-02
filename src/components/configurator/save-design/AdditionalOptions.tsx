// Update props interface
interface AdditionalOptionsProps {
  // ... existing props
  onFoundationClick: () => void;
}

// Update the foundation button onClick handler
<button 
  onClick={onFoundationClick}
  className="text-primary hover:text-primary-hover font-medium"
>
  Select your foundation type
</button>