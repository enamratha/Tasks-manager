import {Component} from 'react'
import {v4} from 'uuid'

import TabItem from '../TabItem'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    userInput: '',
    selectedTag: tagsList[0].optionId,
    tasks: [],
    activeTab: '',
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onChangeSelectedTag = event => {
    this.setState({selectedTag: event.target.value})
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {userInput, selectedTag} = this.state
    if (userInput !== '') {
      const taskObj = {
        id: v4(),
        task: userInput,
        tag: selectedTag,
      }
      this.setState(prevState => ({
        tasks: [...prevState.tasks, taskObj],
        userInput: '',
        selectedTag: tagsList[0].optionId,
      }))
    }
  }

  onSelectTag = (id, isActive) => {
    if (isActive === true) {
      this.setState({activeTab: ''})
    } else {
      this.setState({activeTab: id})
    }
  }

  render() {
    const {userInput, selectedTag, activeTab, tasks} = this.state
    let filteredTasks = tasks
    if (activeTab !== '') {
      filteredTasks = tasks.filter(task => task.tag === activeTab)
    }
    return (
      <div className="main-container">
        <form className="page-form" onSubmit={this.onSubmitTask}>
          <h1 className="form-heading">Create a Task</h1>
          <div className="input-container">
            <label className="label-element" htmlFor="task">
              Task
            </label>
            <br />
            <input
              className="input-element"
              placeholder="Enter the task here"
              value={userInput}
              onChange={this.onChangeUserInput}
              type="text"
              id="task"
            />
          </div>
          <div className="input-container">
            <label className="label-element" htmlFor="tag">
              Tags
            </label>
            <br />
            <select
              className="input-element"
              value={selectedTag}
              onChange={this.onChangeSelectedTag}
              id="tag"
            >
              {tagsList.map(tag => (
                <option key={tag.optionId} value={tag.optionId}>
                  {tag.displayText}
                </option>
              ))}
            </select>
          </div>
          <button className="add-btn" type="submit">
            Add Task
          </button>
        </form>
        <div className="tasks-container">
          <h1 className="tags-tasks-heading">Tags</h1>
          <ul className="tags-container">
            {tagsList.map(tag => (
              <TabItem
                isActive={activeTab === tag.optionId}
                onSelectTag={this.onSelectTag}
                key={tag.optionId}
                tag={tag}
              />
            ))}
          </ul>
          <div>
            <h1 className="tags-tasks-heading">Tasks</h1>
            {filteredTasks.length !== 0 && (
              <ul className="tasks-list-container">
                {filteredTasks.map(each => (
                  <li className="task-item" key={each.optionId}>
                    <p>{each.task}</p>
                    <p className="task-item-tag">{each.tag}</p>
                  </li>
                ))}
              </ul>
            )}
            {filteredTasks.length === 0 && <p>No Tasks Added Yet</p>}
          </div>
        </div>
      </div>
    )
  }
}

export default MyTasks
