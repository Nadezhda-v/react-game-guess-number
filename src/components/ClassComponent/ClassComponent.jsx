import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Результат',
    userNumber: '',
    randomNumber: this.generateRandomNumber(),
    count: 0,
    isFinished: false,
  };

  generateRandomNumber() {
    return Math.floor(Math.random() *
      (this.props.max - this.props.min + 1)) + this.props.min;
  }

  handlePlayAgain = () => {
    this.setState({
      result: 'Результат',
      count: 0,
      isFinished: false,
      randomNumber: this.generateRandomNumber(),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.isFinished) {
      this.setState((state) => {
        console.log(state);
        if (!this.state.userNumber) {
          return {
            result: `Введите число`,
          };
        }

        if (this.state.userNumber > this.state.randomNumber) {
          return {
            result: `Число ${state.userNumber} больше загаданного`,
          };
        }

        if (this.state.userNumber < this.state.randomNumber) {
          return {
            result: `Число ${state.userNumber} меньше загаданного`,
          };
        }

        return {
          result: `Вы угадали, загаданное число ${state.userNumber}`,
          isFinished: !state.isFinished,
        };
      });
    } else {
      this.handlePlayAgain();
    }

    this.setState((state) => ({
      count: state.count + 1,
      userNumber: '',
    }));
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form
          className={style.form}
          onSubmit={this.handleSubmit}
        >

          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input className={style.input} type='number' id='user_number'
            min='1'
            max='10'
            onChange={this.handleChange}
            value={this.state.userNumber}
          />

          <button className={style.btn}>
            {this.state.isFinished ? 'Сыграть еще?' : 'Угадать'}
          </button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
