import { Link } from 'react-router-dom';

const Button = (props) => {
    return (
        <button className="button">
            <Link to={props.name}>{props.name}</Link>
        </button>
    );
};
export default Button;
