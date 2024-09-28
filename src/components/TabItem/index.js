import './index.css'

const TabItem = props => {
  const {tag, onSelectTag, isActive} = props
  const {optionId, displayText} = tag

  const onClickButton = () => {
    onSelectTag(optionId, isActive)
  }

  const btnClass = isActive === true ? 'active tab-item' : 'tab-item'

  return (
    <li>
      <button
        className={btnClass}
        onClick={onClickButton}
        id={optionId}
        type="button"
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
