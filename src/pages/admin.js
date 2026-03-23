import React, { useState, useEffect, useCallback } from 'react';
import {
    Container, Card, Form, Button, Alert, Spinner,
    Table, Badge, Row, Col, InputGroup, Modal, ProgressBar
} from 'react-bootstrap';
import Header from '../component/header';
import '../App.css';

const API_BASE = process.env.REACT_APP_API_URL || '';

function AdminPage() {
    const [token, setToken] = useState(() => sessionStorage.getItem('admin_token') || '');
    const [username, setUsername] = useState(() => sessionStorage.getItem('admin_user') || '');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checking, setChecking] = useState(true);

    // ログインフォーム
    const [loginUser, setLoginUser] = useState('');
    const [loginPass, setLoginPass] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // スクレイピング
    const [scrapeYear, setScrapeYear] = useState(String(new Date().getFullYear()));
    const [scrapeTarget, setScrapeTarget] = useState('timetable');
    const [scraping, setScraping] = useState(false);
    const [scrapeResult, setScrapeResult] = useState(null);
    const [scrapeError, setScrapeError] = useState('');

    // パスワード変更
    const [showPwModal, setShowPwModal] = useState(false);
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [newPwConfirm, setNewPwConfirm] = useState('');
    const [pwError, setPwError] = useState('');
    const [pwSuccess, setPwSuccess] = useState('');

    // ログ
    const [logs, setLogs] = useState([]);
    const [logsLoading, setLogsLoading] = useState(false);

    const targetLabels = {
        timetable: '教育学部',
        spde: '専門職学位課程',
        master: '修士課程',
    };

    // トークン検証
    const verifyToken = useCallback(async () => {
        if (!token) {
            setChecking(false);
            return;
        }
        try {
            const res = await fetch(`${API_BASE}/api/auth/verify`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                setIsAuthenticated(true);
            } else {
                sessionStorage.removeItem('admin_token');
                sessionStorage.removeItem('admin_user');
                setToken('');
                setUsername('');
            }
        } catch {
            // API未起動時は認証失敗扱い
        }
        setChecking(false);
    }, [token]);

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    // ログイン
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoginLoading(true);

        try {
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: loginUser, password: loginPass }),
            });

            if (res.ok) {
                const data = await res.json();
                setToken(data.token);
                setUsername(data.username);
                sessionStorage.setItem('admin_token', data.token);
                sessionStorage.setItem('admin_user', data.username);
                setIsAuthenticated(true);
                setLoginUser('');
                setLoginPass('');
            } else {
                const err = await res.json();
                setLoginError(err.detail || 'ログインに失敗しました');
            }
        } catch {
            setLoginError('サーバーに接続できません');
        }
        setLoginLoading(false);
    };

    // ログアウト
    const handleLogout = () => {
        sessionStorage.removeItem('admin_token');
        sessionStorage.removeItem('admin_user');
        setToken('');
        setUsername('');
        setIsAuthenticated(false);
    };

    // スクレイピング実行
    const handleScrape = async () => {
        setScraping(true);
        setScrapeResult(null);
        setScrapeError('');

        try {
            const res = await fetch(`${API_BASE}/api/scrape`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ year: scrapeYear, target: scrapeTarget }),
            });

            if (res.ok) {
                const data = await res.json();
                setScrapeResult(data);
                fetchLogs();
            } else {
                const err = await res.json();
                setScrapeError(err.detail || 'スクレイピングに失敗しました');
            }
        } catch {
            setScrapeError('サーバーに接続できません');
        }
        setScraping(false);
    };

    // パスワード変更
    const handleChangePassword = async () => {
        setPwError('');
        setPwSuccess('');

        if (newPw !== newPwConfirm) {
            setPwError('新しいパスワードが一致しません');
            return;
        }
        if (newPw.length < 8) {
            setPwError('パスワードは8文字以上にしてください');
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/api/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    current_password: currentPw,
                    new_password: newPw,
                }),
            });

            if (res.ok) {
                setPwSuccess('パスワードを変更しました');
                setCurrentPw('');
                setNewPw('');
                setNewPwConfirm('');
            } else {
                const err = await res.json();
                setPwError(err.detail || 'パスワード変更に失敗しました');
            }
        } catch {
            setPwError('サーバーに接続できません');
        }
    };

    // ログ取得
    const fetchLogs = useCallback(async () => {
        setLogsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/scrape/logs`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setLogs(data.logs || []);
            }
        } catch {
            // ログ取得失敗は無視
        }
        setLogsLoading(false);
    }, [token]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchLogs();
        }
    }, [isAuthenticated, fetchLogs]);

    // ========== ログイン画面 ==========
    if (checking) {
        return (
            <div className="App">
                <Header />
                <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <Spinner animation="border" variant="primary" />
                </Container>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="App">
                <Header />
                <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <Card style={{ width: '100%', maxWidth: '420px' }} className="shadow">
                        <Card.Header className="text-center" style={{ backgroundColor: 'rgb(13, 31, 160)', color: 'white' }}>
                            <Card.Title className="mb-0 py-1">
                                <i className="bi bi-shield-lock me-2"></i>
                                管理者ログイン
                            </Card.Title>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {loginError && (
                                <Alert variant="danger" onClose={() => setLoginError('')} dismissible>
                                    {loginError}
                                </Alert>
                            )}
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label>ユーザー名</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <i className="bi bi-person"></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            value={loginUser}
                                            onChange={(e) => setLoginUser(e.target.value)}
                                            placeholder="ユーザー名を入力"
                                            required
                                            autoComplete="username"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>パスワード</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <i className="bi bi-key"></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type={showPassword ? 'text' : 'password'}
                                            value={loginPass}
                                            onChange={(e) => setLoginPass(e.target.value)}
                                            placeholder="パスワードを入力"
                                            required
                                            autoComplete="current-password"
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => setShowPassword(!showPassword)}
                                            tabIndex={-1}
                                        >
                                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" disabled={loginLoading}
                                        style={{ backgroundColor: 'rgb(13, 31, 160)', borderColor: 'rgb(13, 31, 160)' }}>
                                        {loginLoading ? (
                                            <><Spinner animation="border" size="sm" className="me-2" />ログイン中...</>
                                        ) : (
                                            'ログイン'
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }

    // ========== 管理画面 ==========
    return (
        <div className="App">
            <Header />
            <Container>
                {/* ヘッダー部分 */}
                <Row className="mb-3 align-items-center">
                    <Col>
                        <h4 className="mb-0">
                            <i className="bi bi-gear me-2"></i>管理者パネル
                        </h4>
                    </Col>
                    <Col xs="auto">
                        <Badge bg="secondary" className="me-2">
                            <i className="bi bi-person-fill me-1"></i>{username}
                        </Badge>
                        <Button variant="outline-secondary" size="sm" onClick={() => setShowPwModal(true)} className="me-2">
                            <i className="bi bi-key me-1"></i>パスワード変更
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-1"></i>ログアウト
                        </Button>
                    </Col>
                </Row>

                {/* スクレイピング実行 */}
                <Card className="mb-4 shadow-sm">
                    <Card.Header style={{ backgroundColor: 'rgb(13, 31, 160)', color: 'white' }}>
                        <i className="bi bi-cloud-download me-2"></i>シラバス更新
                    </Card.Header>
                    <Card.Body>
                        <Row className="align-items-end g-3">
                            <Col sm={3}>
                                <Form.Group>
                                    <Form.Label>年度</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={scrapeYear}
                                        onChange={(e) => setScrapeYear(e.target.value)}
                                        min="2020"
                                        max="2030"
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group>
                                    <Form.Label>対象</Form.Label>
                                    <Form.Select
                                        value={scrapeTarget}
                                        onChange={(e) => setScrapeTarget(e.target.value)}
                                    >
                                        <option value="timetable">教育学部</option>
                                        <option value="spde">専門職学位課程</option>
                                        <option value="master">修士課程</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col sm={5}>
                                <Button
                                    variant="primary"
                                    onClick={handleScrape}
                                    disabled={scraping}
                                    style={{ backgroundColor: 'rgb(13, 31, 160)', borderColor: 'rgb(13, 31, 160)' }}
                                >
                                    {scraping ? (
                                        <>
                                            <Spinner animation="border" size="sm" className="me-2" />
                                            スクレイピング中...（数分かかります）
                                        </>
                                    ) : (
                                        <><i className="bi bi-play-fill me-1"></i>スクレイピング実行</>
                                    )}
                                </Button>
                            </Col>
                        </Row>

                        {scraping && (
                            <div className="mt-3">
                                <ProgressBar animated now={100} variant="primary"
                                    label="処理中..." />
                                <small className="text-muted">
                                    シラバスの件数によっては数分～十数分かかる場合があります。
                                    このページを閉じないでください。
                                </small>
                            </div>
                        )}

                        {scrapeResult && (
                            <Alert variant="success" className="mt-3" onClose={() => setScrapeResult(null)} dismissible>
                                <Alert.Heading>
                                    <i className="bi bi-check-circle me-2"></i>更新完了
                                </Alert.Heading>
                                <p className="mb-1">{scrapeResult.message}</p>
                                <p className="mb-1">ファイル: {scrapeResult.filename}</p>
                                {scrapeResult.errors && scrapeResult.errors.length > 0 && (
                                    <details>
                                        <summary className="text-warning">
                                            警告: {scrapeResult.errors.length}件のエラーあり
                                        </summary>
                                        <ul className="mb-0 mt-1">
                                            {scrapeResult.errors.map((err, i) => (
                                                <li key={i}>{err}</li>
                                            ))}
                                        </ul>
                                    </details>
                                )}
                            </Alert>
                        )}

                        {scrapeError && (
                            <Alert variant="danger" className="mt-3" onClose={() => setScrapeError('')} dismissible>
                                <i className="bi bi-exclamation-triangle me-2"></i>{scrapeError}
                            </Alert>
                        )}
                    </Card.Body>
                </Card>

                {/* 実行ログ */}
                <Card className="mb-4 shadow-sm">
                    <Card.Header style={{ backgroundColor: '#495057', color: 'white' }}>
                        <i className="bi bi-journal-text me-2"></i>実行ログ
                        <Button variant="outline-light" size="sm" className="float-end"
                            onClick={fetchLogs} disabled={logsLoading}>
                            <i className="bi bi-arrow-clockwise"></i>
                        </Button>
                    </Card.Header>
                    <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {logsLoading ? (
                            <div className="text-center py-3"><Spinner animation="border" size="sm" /></div>
                        ) : logs.length === 0 ? (
                            <p className="text-muted text-center mb-0">ログがありません</p>
                        ) : (
                            <Table striped hover responsive size="sm">
                                <thead className="table-dark">
                                    <tr>
                                        <th>日時</th>
                                        <th>ユーザー</th>
                                        <th>対象</th>
                                        <th>年度</th>
                                        <th>ステータス</th>
                                        <th>件数</th>
                                        <th>メッセージ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log) => (
                                        <tr key={log.id}>
                                            <td style={{ whiteSpace: 'nowrap' }}>
                                                {new Date(log.created_at + 'Z').toLocaleString('ja-JP')}
                                            </td>
                                            <td>{log.username}</td>
                                            <td>{targetLabels[log.target] || log.target}</td>
                                            <td>{log.year}</td>
                                            <td>
                                                <Badge bg={log.status === 'success' ? 'success' : 'danger'}>
                                                    {log.status === 'success' ? '成功' : 'エラー'}
                                                </Badge>
                                            </td>
                                            <td>{log.item_count}</td>
                                            <td>{log.message}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
            </Container>

            {/* パスワード変更モーダル */}
            <Modal show={showPwModal} onHide={() => { setShowPwModal(false); setPwError(''); setPwSuccess(''); }}>
                <Modal.Header closeButton style={{ backgroundColor: 'rgb(13, 31, 160)', color: 'white' }}>
                    <Modal.Title>パスワード変更</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pwError && <Alert variant="danger">{pwError}</Alert>}
                    {pwSuccess && <Alert variant="success">{pwSuccess}</Alert>}
                    <Form.Group className="mb-3">
                        <Form.Label>現在のパスワード</Form.Label>
                        <Form.Control type="password" value={currentPw}
                            onChange={(e) => setCurrentPw(e.target.value)}
                            autoComplete="current-password" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>新しいパスワード（8文字以上）</Form.Label>
                        <Form.Control type="password" value={newPw}
                            onChange={(e) => setNewPw(e.target.value)}
                            autoComplete="new-password" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>新しいパスワード（確認）</Form.Label>
                        <Form.Control type="password" value={newPwConfirm}
                            onChange={(e) => setNewPwConfirm(e.target.value)}
                            autoComplete="new-password" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPwModal(false)}>閉じる</Button>
                    <Button variant="primary" onClick={handleChangePassword}
                        style={{ backgroundColor: 'rgb(13, 31, 160)', borderColor: 'rgb(13, 31, 160)' }}>
                        変更する
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AdminPage;
