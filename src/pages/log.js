import React from 'react';
import Header from "../component/header";
import { Table } from 'react-bootstrap';

function log() {
  return (
    <React.Fragment>
      <Header />
      <>
        NUESSとは，Nara University of Education Searchable Syllabus(奈良教育大学 検索できるシラバス)の略です。このシステム(というか制作者の信念)では，「他のサイト様になるべく迷惑をかけない」をモットーにしているため，シラバス情報の自動更新・取得などはしておらず，制作者が手動で更新する仕組みとなっています。ご安心(？)ください。
      </>
      <Table striped responsive>
        <thead className="table-dark text-center">
          <tr>
            <th>年月日</th>
            <th>変更箇所</th>
            <th>変更内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">2021/5/17</th>
            <td>新規作成</td>
            <td><a href="https://make-it-tsukuba.github.io/alternative-tsukuba-kdb/" target='_blank' rel='noopener noreferrer'>筑波大学 Kdbっぽいなにか</a>に着想を得て，奈良教育大学版を作成。</td>
          </tr>
          <tr>
            <th scope="row">2021/5/30</th>
            <td>検索機能</td>
            <td>教員名検索機能を追加。</td>
          </tr>
          <tr>
            <th scope="row">2021/6/9</th>
            <td>ナビゲーションバー</td>
            <td>タイトル文字を垂直中央揃えに。</td>
          </tr>
          <tr>
            <th scope="row">2021/8/9</th>
            <td>デザイン</td>
            <td>ページデザインを抜本的に変更。<br /> ＜詳細な変更点＞
              <br /> CSSにBootstrapを採用。
              <br /> 曜日・時限を直感的に選択できるように，時間割表風のデザインに変更。
              <br /> 曜日・時限の選択を全解除・全選択できるように変更。
              <br /> 条件指定内容をリセットできるように変更。
              <br /> シラバスの表をホバーしたときに色が変わるように変更。
            </td>
          </tr>
          <tr>
            <th scope="row">2021/8/9</th>
            <td>About</td>
            <td>Aboutページを作成。</td>
          </tr>
          <tr>
            <th scope="row">2021/8/10</th>
            <td>ページネーション機能</td>
            <td>シラバスの表を20行ごとのページで区切るように変更。</td>
          </tr>
          <tr>
            <th scope="row">2021/8/13</th>
            <td>ページネーション機能</td>
            <td>各ページに表示する件数をユーザーが選択できるように変更。<br />そのページに表示している授業が何件目～何件目かを表示するように変更。</td>
          </tr>
          <tr>
            <th scope="row">2021/8/18</th>
            <td>フッター</td>
            <td>ページ操作関係のボタン・テキストをすべてフッターに表示。<br />シラバスの表に対して下側マージンを適用し，フッターと被らないようにした。</td>
          </tr>
          <tr>
            <th scope="row">2021/8/24</th>
            <td>検索機能</td>
            <td>検索結果が0件であるときの処理にエラーが生じていたため修正。<br />また，科目名の最大入力文字数を20文字から30文字に変更。<br />開講学期を選択するラジオボタンにラベルを設定し，文字列をクリックしても該当の学期を選択できるように変更。</td>
          </tr>
          <tr>
            <th scope="row">2021/9/9</th>
            <td>検索機能</td>
            <td>検索フォームを折りたためるよう，アコーディオンに変更。</td>
          </tr>
          <tr>
            <th scope="row">2022/3/27</th>
            <td>デザイン</td>
            <td>ページデザインを抜本的に変更。<br /> ＜詳細な変更点＞
              <br /> シラバスを2022年度(2022/3/27時点)のものに更新。
              <br /> UI構築のためのライブラリにReactを採用。
              <br /> フォントを変更。
              <br /> ページネーション機能の削除(ページ内検索をしやすくするため)。
            </td>
          </tr>
          <tr>
            <th scope="row">2022/8/13</th>
            <td>サーバ</td>
            <td>サーバをGithub PagesからVALUE SERVERに移転。
            </td>
          </tr>
          <tr>
            <th scope="row">2022/8/17</th>
            <td>.htaccessファイル</td>
            <td>.htaccessファイルを配置し，/change_logに直接アクセスしても閲覧可能となった。
            </td>
          </tr>
          <tr>
            <th scope="row">2022/8/18</th>
            <td>検索機能など</td>
            <td>検索のためのコードを親コンポーネントに搭載。<br />Tableのstyleを見直し，適切なClassNameを設定した。
            </td>
          </tr>
          <tr>
            <th scope="row">2022/9/8</th>
            <td>シラバス</td>
            <td>データを2022年度(2022/9/8時点)のものに更新。
            </td>
          </tr>
          <tr>
            <th scope="row">2023/3/23</th>
            <td>シラバス</td>
            <td>データを2023年度(2023/3/23時点)のものに更新。
            </td>
          </tr>
          <tr>
            <th scope="row">2023/3/25</th>
            <td>シラバス</td>
            <td>データを2023年度(2023/3/25時点)のものに更新。
            </td>
          </tr>
          <tr>
            <th scope="row">2023/4/8</th>
            <td>シラバス</td>
            <td>データを2023年度(2023/4/8時点)のものに更新。
            </td>
          </tr>
          <tr>
            <th scope="row">2023/4/22</th>
            <td>更新履歴</td>
            <td>当サイトの説明を追加。
            </td>
          </tr>
          <tr>
            <th scope="row">2023/4/22</th>
            <td>シラバス</td>
            <td>データを2023年度(2023/4/22時点)のものに更新。<br />シラバス情報に「関連するSDGsのゴール」の情報を含めた。
            </td>
          </tr>
          <tr>
            <th scope="row">2023/4/22</th>
            <td>検索機能</td>
            <td>「関連するSDGsのゴール」の検索に対応。<br />スペースの有無や種類を区別しない検索に対応。
            </td>
          </tr>
          <tr>
            <th scope="row">2023/4/23</th>
            <td>デザイン</td>
            <td>iOSにて"filter: drop-shadow"が崩れていたため，GPUアクセラレーションを有効化する処理を追記。<br />Reactのmanifest.jsonにあった，"icons"の記述を削除。
            </td>
          </tr>
          <tr>
            <th scope="row">2023/4/26</th>
            <td>ページネーション</td>
            <td>ページネーション機能の再追加。
            </td>
          </tr>
          <tr>
            <th scope="row">2023/4/26</th>
            <td>デザイン</td>
            <td>フォントをNoto Sans JPに設定。
            </td>
          </tr>
          <tr>
            <th scope="row">2023/4/29</th>
            <td>検索機能</td>
            <td>リセット機能や自動検索機能のON・OFFに対応。
            </td>
          </tr>
          <tr>
            <th scope="row">2023/4/30</th>
            <td>検索機能</td>
            <td>リセットした際に自動検索がOFFになってしまう問題を修正。
            </td>
          </tr>
          <tr>
            <th scope="row">2023/5/5</th>
            <td>シラバス</td>
            <td>教室名を追加。
            </td>
          </tr>
          <tr>
            <th scope="row">2023/5/5</th>
            <td>検索機能</td>
            <td>英数字の全角・半角を区別しない検索に対応。
            </td>
          </tr>
        </tbody>
      </Table>
      <p style={{'text-align': 'center'}}>Source code is available on <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg><a href="https://github.com/kzmw/nuess-react" target='_blank' rel='noopener noreferrer'>GitHub</a></p>
    </React.Fragment>
  );
}

export default log;