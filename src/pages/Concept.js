import React, { useEffect, useState }from "react";
import { Link } from 'react-router-dom';
import "./Concept.css"


function Concept() {
    const [insects, setInsects] = useState([]);
    const [plants, setPlants] = useState([]);
    const [fishes, setFishes] = useState([]);

    useEffect(() => {
        const filePath = '/new_species.csv';
        var insects = [];
        var fishes = [];
        var plants = [];
        fetch(filePath)
            .then((response) => response.text())
            .then((data) => {
                const lines = data.split('\n');
                lines.forEach((line, index) => {
                    line = line.split(',');
                    const species_name = line[0];
                    const genre_id = parseInt(line[1]);
                    if (genre_id === 1) {
                        insects = [...insects, species_name];
                    } else if (genre_id === 2) {
                        fishes = [...fishes, species_name];
                    } else if (genre_id === 3) {
                        plants = [...plants, species_name];
                    }
                });
                setInsects(insects);
                setFishes(fishes);
                setPlants(plants);
            })
            .catch((error) => {
                console.error('ファイルの読み込み中にエラーが発生しました: ', error);
            });   
    }, []);

    return (
        <>
        <div className="header">
          <div className='title'>BIO-MAP</div>
          <Link to="/" className="login-button">戻る</Link>
        </div>
        <div className="concept-container">
          <h2>サービスへの思い</h2>
          <p>生き物の写真を撮影したものの，フォルダーの底に眠っている写真があることに気づき，そのような写真を共有したいという想いから生まれました．
            「ふと身近にいた生物の写真を共有したい．しかし，インスタやXに投稿するのは躊躇する．また，身近にどんな生物がいるのかを知りたい．
            生物の図鑑を埋めたい」というような場合に，このサービスは役に立ちます．</p>
        <hr></hr>
          <h2>検索・登録できる生物のリスト</h2>
          <ul>
            <li>
              <h3>昆虫</h3>
              <ul className="container">
                {insects.map((insect, index) => (
                  <li key={index} className="column">{insect}</li>
                ))}
              </ul>
            </li>
            <li> 
              <h3>魚類</h3>
              <ul className="container">
                {fishes.map((fish, index) => (
                  <li key={index} className="column">{fish}</li>
                ))}
              </ul>
            </li>
            <li>
              <h3>植物</h3>
              <ul className="container">
                {plants.map((plant, index) => (
                  <li key={index} className="column">{plant}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        </>
    )
}
export default Concept;