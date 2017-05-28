import React from 'react';
import ReactDom from 'react-dom';


const defaultTodos = {
  tasks: [
    {
      text: 'Task A',
      completed: false,
    },
    {
      text: 'Task B',
      completed: true,
    },
    {
      text: 'Task C',
      completed: false,
    },
  ],
};


class TodoList extends React.Component {
  constructor() {
    super()

    // State の初期値を設定
    this.state = defaultTodos;
  }

  onClick(index) {
    // CkeckBox がクリックされたときの動作を定義

    console.info(`Task No. ${index} Clicked.`);

    const tasks = this.state.tasks;
    const newTasks = tasks.map((task, _index) => {
      if (_index == index) {
        // 指定された index のタスクのみ completed の値を反転させる
        // 完了 -> 未完了 または 未完了 -> 完了
        return Object.assign({}, task, { completed: !task.completed });
      } else {
        // 指定されていないタスクは変更しない、そのまま返す
        return task;
      }
    });

    // State を更新
    this.setState({ tasks: newTasks });
  }

  render() {
    // State を元に <li> を作る
    const lis = this.state.tasks.map((task, index) => {
      return (
        <li
          key={index}                                    // React のとある事情により key 属性が必須
          className={task.completed ? 'completed' : ''}  // ES2015 の事情により class 属性ではなく className 属性を使う
        >
          <label>
            <input
              type="checkbox"
              defaultChecked={task.completed}            // React のとある事情により checked 属性ではなく defaultChecked 属性を使う
              onClick={(e) => { this.onClick(index); }}  // クリック去れたときには TodoList.onclick() を呼び出す
            />
            {task.text}
          </label>
        </li>
      )
    })

    return (
      <div className="todo-list">
        <ul>
          {lis}
        </ul>
        <p>残りタスク数: {this.state.tasks.filter((task) => (!task.completed)).length}</p>
      </div>
    )
  }
}


// <TodoList /> 要素をレンダリングして <div class="container"></div> の中に埋め込む
ReactDom.render(
  <TodoList />,
  document.querySelector('.container')
);
