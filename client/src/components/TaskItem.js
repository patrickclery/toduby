import React from "react"
import EdiText from "react-editext"
import {useDispatch} from "react-redux"
import {destroyTask, removeTask, updateTask} from "../slices/tasksSlice"
import tw, {styled} from "twin.macro"

// This was showing as undefined when I put it in the function scope so it has to be up here for now
const EdiTextStyled = styled(EdiText)`
  div[editext="view-container"] {
    ${tw`
      font-bold
      font-serif
      ml-3 mr-3
      text-lg
    `}
  }
`

const TaskItem = props => {

  const {task: {id, attributes}} = props
  const {description, completedAt, priority} = attributes
  const dispatch = useDispatch()

  /**
   * @description Dispatches an updated version of the task for update. This is used for all
   * attributes, including the completed checkbox
   * @param {number} id of the task
   * @param {object} attribute name to update
   * @param {object} value of the attribute
   */
  const handleUpdate = (id, attribute, value) => {
    dispatch(updateTask({
                          id,
                          attributes: {
                            [attribute]: value
                          }
                        }))
  }
  const handleDestroy = ({id}) => {
    dispatch(destroyTask({id}))
    dispatch(removeTask({id}))
  }
  const handleToggle = () => {
    const newAttributes = {
      ...attributes,
      completed: !!completedAt ? "0" : "1"
    }
    dispatch(updateTask({
                          id,
                          attributes: newAttributes
                        }))
  }

  const Description = ({completedAt, onSave, description}) => {

    return <EdiTextStyled
      cancelOnEscape
      completedAt={completedAt}
      onSave={onSave}
      showButtonsOnHover
      submitOnEnter
      submitOnUnfocus
      tw="grid col-span-3"
      type="text"
      validation={value => value.length >= 3}
      validationMessage="Please type at least 3 characters."
      value={description}
    />
  }

  const Container = tw.div`
    gap-3
    grid
    grid-cols-5
    max-w-screen-sm
    mb-2
    mt-2
  `
  const DescriptionColumn = tw.div`
    col-span-3
    gap-3
    flex
    items-center
  `
  const Checkbox = ({isCompleted, value, onChange}) =>
    <input
      checked={isCompleted}
      type="checkbox"
      tw="
        col-span-2
        grid
      "
      {...{
        onChange,
        value
      }}
    />
  const PrioritySelect = ({onChange, value}) =>
    <select
      {...{
        onChange,
        value
      }}
      name="priority-select"
      tw="
        px-3
      "
    >
      <option value="0">Low</option>
      <option value="1">Medium</option>
      <option value="2">High</option>
    </select>
  const DeleteButton = ({onClick}) =>
    <button
      {...{onClick}}
      tw="
        bg-red-500
        border-4
        border-red-500
        flex-shrink-0
        hover:bg-red-700
        hover:border-red-700
        px-2
        py-1
        rounded
        text-sm
        text-white
      "
      type="button"
    >Delete</button>

  return (
    <Container>
      <DescriptionColumn>
        <Checkbox
          isCompleted={!!completedAt}
          onChange={e => {
            e.preventDefault()
            handleToggle()
          }}
          value={id}
        />
        <Description
          completedAt={!!completedAt}
          {...{description}}
          onSave={value => handleUpdate(id, "description", value)}
        />
      </DescriptionColumn>
      <PrioritySelect
        onChange={e => handleUpdate(id, "priority", e.target.value)}
        value={priority}
      />
      <DeleteButton
        onClick={e => {
          e.preventDefault()
          handleDestroy({id})
        }}
      />
    </Container>
  )
}

export default TaskItem
