import React, {Component} from 'react'
import {observer} from 'mobx-react'
import { If } from '../lib';


@observer class InputField extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    this.props.onChange(event.target.name, event.target.value)
  }

  render () {
    const input = this.props
    return (
      <div className="form-group">
        <label htmlFor={input.id}>{input.label || input.name}</label>
        <div className="input-group">
          <If cond={input.addOn}>
              <div className="input-group-addon">{input.addOn}</div>
          </If>
          <input
              className="form-control"
              id={input.id}
              name={input.name}
              onChange={this.onChange}
              type={input.type}
              value={input.value}/>
        </div>
    </div>
    )
  }
}

export default InputField