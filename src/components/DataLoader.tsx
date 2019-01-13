import React, { Component } from 'react'
import { API_ENDPOINT } from '../config'

interface DataStatus {
  loading: boolean
  error: Error | null
  data: Record<string, any> | null
}

interface Props {
  path: string
  children(render: DataStatus): React.ReactNode | null
}

type State = DataStatus

class DataLoader extends Component<Props, State> {
  public state = {
    loading: false,
    error: null,
    data: null,
  }

  public async componentDidMount() {
    this.setState({ loading: true })

    const res = await fetch(`${API_ENDPOINT}${this.props.path}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          loading: false,
          data,
        })
      )
      .catch(error =>
        this.setState({
          loading: false,
          error,
        })
      )
  }

  public render() {
    return this.props.children(this.state)
  }
}

export default DataLoader
