import React from 'react';
import Header from "../component/header";
import { Table } from 'react-bootstrap';

function log() {
  return (
    <React.Fragment>
      <Header />
      <Table striped>
        <thead class="table-dark text-center">
          <tr>
            <th>年月日</th>
            <th>変更箇所</th>
            <th>変更内容</th>
            <th>変更者</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">2021/5/17</th>
            <td>新規作成</td>
            <td><a href="https://make-it-tsukuba.github.io/alternative-tsukuba-kdb/">筑波大学 Kdbっぽいなにか</a>に着想を得て奈良教育大学版を作成。</td>
            <td>kzmw</td>
          </tr>
          <tr>
            <th scope="row">2021/5/30</th>
            <td>検索機能</td>
            <td>教員名検索機能を追加。</td>
            <td>kzmw</td>
          </tr>
          <tr>
            <th scope="row">2021/6/9</th>
            <td>ナビゲーションバー</td>
            <td>タイトル文字を垂直中央揃えに。</td>
            <td>kzmw</td>
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
            <td>kzmw</td>
          </tr>
          <tr>
            <th scope="row">2021/8/9</th>
            <td>About</td>
            <td>Aboutページを作成。</td>
            <td>kzmw</td>
          </tr>
          <tr>
            <th scope="row">2021/8/10</th>
            <td>ページネーション機能</td>
            <td>シラバスの表を20行ごとのページで区切るように変更。</td>
            <td>kzmw</td>
          </tr>
          <tr>
            <th scope="row">2021/8/13</th>
            <td>ページネーション機能</td>
            <td>各ページに表示する件数をユーザーが選択できるように変更。<br />そのページに表示している授業が何件目～何件目かを表示するように変更。</td>
            <td>kzmw</td>
          </tr>
          <tr>
            <th scope="row">2021/8/18</th>
            <td>フッター</td>
            <td>ページ操作関係のボタン・テキストをすべてフッターに表示。また，シラバスの表に対して下側マージンを適用し，フッターと被らないようにした。</td>
            <td>kzmw</td>
          </tr>
          <tr>
            <th scope="row">2021/8/24</th>
            <td>検索機能</td>
            <td>検索結果が0件であるときの処理にエラーが生じていたため修正。<br />また，科目名の最大入力文字数を20文字から30文字に変更。<br />開講学期を選択するラジオボタンにラベルを設定し，文字列をクリックしても該当の学期を選択できるように変更。</td>
            <td>kzmw</td>
          </tr>
          <tr>
            <th scope="row">2021/9/9</th>
            <td>検索機能</td>
            <td>検索フォームを折りたためるよう，アコーディオンに変更。</td>
            <td>kzmw</td>
          </tr>
          <tr>
            <th scope="row">2022/3/27</th>
            <td>デザイン</td>
            <td>ページデザインを抜本的に変更。<br /> ＜詳細な変更点＞
              <br /> シラバスを2022年度のものに更新。
              <br /> UI構築のためのライブラリにReactを採用。
              <br /> フォントを変更。
              <br /> ページネーション機能の削除(ページ内検索をしやすくするため)。
            </td>
            <td>kzmw</td>
          </tr>
          <tr>
            <th scope="row">2022/8/13</th>
            <td>サーバ</td>
            <td>サーバをGithub PagesからVALUE SERVERに移転。
            </td>
            <td>kzmw</td>
          </tr>
          <tr>
            <th scope="row">2022/8/17</th>
            <td>.htaccessファイル</td>
            <td>.htaccessファイルを配置し，/change_logに直接アクセスしても閲覧可能となった。
            </td>
            <td>kzmw</td>
          </tr>
          <tr>
            <th scope="row">2022/8/18</th>
            <td>検索機能など</td>
            <td>検索のためのコードを親コンポーネントに搭載。<br />Tableのstyleを見直し，適切なClassNameを設定した。
            </td>
            <td>kzmw</td>
          </tr>
          <tr>
            <th scope="row">2022/9/8</th>
            <td>シラバス</td>
            <td>データを2022/9/8時点のものに更新。
            </td>
            <td>kzmw</td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
}

export default log;