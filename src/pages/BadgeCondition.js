import React, {useState, useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom';

function BadgeCondition() {
    const [badge_conditions, setConditions] = useState([]);

    const location = useLocation();
    console.log(badge_conditions)
    const badges = location.state.badges || [];
    
    useEffect(() => {
        const filePath = '/badge_condition.csv';
        var conditions = [];
        fetch(filePath)
            .then((response) => response.text())
            .then((data) => {
                const lines = data.split('\n');
                lines.forEach((line, index) => {
                    line = line.split(',');
                    const condition = line[1];
                    conditions = [...conditions, condition];
                });
                setConditions(conditions);
            })
            .catch((error) => {
                console.error('ファイルの読み込み中にエラーが発生しました: ', error);
            });   
    }, []);

    return (
        <>
          <div className="header">
              <div className='title'>BIO-MAP</div>
              <Link to="/mypage" className="login-button">戻る</Link>
          </div>
          <h1>New Page</h1>
          <h3>バッジ獲得条件</h3>
          <table>
            <tbody>
              {badge_conditions.map((badge_condition, index) => (
                <tr key={index}>
                  <td>
                    <h1>"hoge"</h1>
                  </td>
                  <td>
                    <p>{badge_condition}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
    );
    
}

export default BadgeCondition;
