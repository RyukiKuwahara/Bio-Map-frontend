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
          <h2>できること</h2>
          <ol>
            <li>
              <h3>検索</h3>
              <p>検索フォームに，生物の名前を入力し，検索ボタンを押すことで，マーカーが表示されます．マーカーを右クリックすることで詳細を確認することができます．※検索・登録できる生物のリストにない名前の生物は検索できません</p>
              <img src="./検索.png" alt=""/>
            </li>
            <li>
              <h3>登録</h3>
              <p>ログイン後，マップ上で右クリックすることにより，投稿フォームが開き，名前，画像，コメントを入力し投稿することができます．一定の条件を満たすと，バッジを獲得することができます．※検索・登録できる生物のリストにない名前の生物は登録できません</p>
              <img src="./登録.png" alt=""/>
            </li>
            <li>
              <h3>マイページ</h3>
              <p>ログイン後，画面右上のマイページボタンからマイページに飛ぶことができ，獲得したバッジと今までの投稿を確認することができます．</p>
              <img src="./マイページ.png" alt=""/>

            </li>
          </ol>
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