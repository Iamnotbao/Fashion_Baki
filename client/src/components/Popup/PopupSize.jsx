import React, { useState } from 'react';
import './PopupSize.css'; // Import the CSS file
import Slider from '@mui/material/Slider';

const PopupSize = ({handleClose}) => {


    const [height, setHeight] = useState(65);
    const [weight, setWeight] = useState(60);
   
    
    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    };

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    const calculateProgress = (value, max) => {
        return (value / max) * 100;
    };

    return (
        <div className="popup-size open" data-popup-id="popup-size">
            <div className="popup-overlay"></div>

            <div className="popup-main">
                <div className="popup-main-wrapper">
                    <div className="popup-over">
                        <div className="popup-wrapper">
                            <form
                                action=""
                                className="is-loading-group monaFormSearch"
                                id="f-search-size"
                            >
                                <input type="hidden" name="product_id" value="40876" />
                                <div className="popup-size-form">
                                    <div className="popup-size-head t-center fw-7">
                                        <p className="popup-size-title t24">
                                            BAKI GIÚP BẠN TÌM RA KÍCH CỠ PHÙ HỢP NHẤT
                                        </p>
                                        <p className="popup-size-sub">
                                            Bảng kích thước này chỉ mang tính chất tham khảo cho người mặc form
                                            dáng vừa vặn.
                                        </p>
                                    </div>
                                    <div className="popup-size-sd">
                                        <p className="popup-size-tt t24 fw-7">SỐ ĐO</p>
                                        <div className="popup-size-fl">
                                            <span className="text">CHIỀU CAO VÀ CÂN NẶNG CỦA BẠN</span>
                                            <div className="popup-size-cm">
                                                <span className="text fw-7">CM</span> | <span className="text">KG</span>
                                            </div>
                                        </div>
                                        <div className="popup-size-item">
                                            <span className="title">CHIỀU CAO</span>
                                            <div className="range">
                                                <div className="range-slider">
                                                    <div className="progress" style={{ right: `${100 - calculateProgress(height, 200)}%` }}></div>
                                                    <div className="range-number" style={{ right: `${100 - calculateProgress(height, 200)}%` }}>
                                                        <span className="number">{height}</span>cm
                                                    </div>
                                                </div>
                                                <div className="range-input">
                                                    <input
                                                        type="range"
                                                        name="height"
                                                        className="range-val"
                                                        min="0"
                                                        max="200"
                                                        value={height}
                                                        onChange={handleHeightChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="dv">
                                                <span className="number">200</span> cm
                                            </div>
                                        </div>
                                        <div className="popup-size-item">
                                            <span className="title">CÂN NẶNG</span>
                                            <div className="range">
                                                <div className="range-slider">
                                                    <div className="progress" style={{ right: `${100 - calculateProgress(weight, 100)}%` }}></div>
                                                    <div className="range-number" style={{ right: `${100 - calculateProgress(weight, 100)}%` }}>
                                                        <span className="number">{weight}</span>kg
                                                    </div>
                                                </div>
                                                <div className="range-input">
                                                    <input
                                                        type="range"
                                                        name="weight"
                                                        className="range-val"
                                                        min="0"
                                                        max="100"
                                                        value={weight}
                                                        onChange={handleWeightChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="dv">
                                                <span className="number">100</span> kg
                                            </div>
                                        </div>
                                    </div>
                                    <div className="popup-text-sd">
                                        <div className="text">
                                            Nếu bạn có nhu cầu cá nhân hóa thì có thể tự nâng/hạ kích thước hoặc{' '}
                                            <a target="_blank" href="https://m.me/103395381688598">
                                                liên hệ
                                            </a>{' '}
                                            Baki để được tư vấn.
                                        </div>
                                    </div>
                                    <button className="cbtn white full m-top fw-7" type="submit">
                                        <span className="text">TÌM CỠ CỦA TÔI</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="popup-close"  onClick={handleClose} >
                <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
            </div>
        </div>
    );
};

export default PopupSize;
