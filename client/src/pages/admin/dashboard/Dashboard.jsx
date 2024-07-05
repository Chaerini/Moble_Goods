import React from "react";
// import AdminSidebar from "../adminSidebar/AdminSidebar";
// import AdminHeader from "../adminHeader/AdminHeader";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="admin-dashboard-wrapper">
      <div className="dashboard-main-wrapper">
        {/* <AdminSidebar />
        <AdminHeader /> */}
        <div className="dashboard-main-content">
          {/* 카드 1 */}
          <div className="dashboard-card-wrapper">
            <div className="dashboard-card-header">
              <div className="dashboard-card-header-title">
                <p className="dashboard-card-header-title-text">
                  일별 매출 현황
                </p>
              </div>

              <div className="dashboard-card-export-btn-box">
                <button className="dashboard-export-btn">내보내기</button>
              </div>
            </div>

            <div className="dashboard-card-contents-wrapper">
              <div className="dashboard-card">
                <div className="dashboard-card-background purple">
                  <div className="dashboard-card-value">data</div>
                  <p className="dashboard-card-title">신규 고객</p>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="dashboard-card-background green">
                  <div className="dashboard-card-value">data</div>
                  <p className="dashboard-card-title">판매 상품</p>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="dashboard-card-background yellow">
                  <div className="dashboard-card-value">data</div>
                  <p className="dashboard-card-title">총 주문</p>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="dashboard-card-background red">
                  <div className="dashboard-card-value">data</div>
                  <p className="dashboard-card-title">총 매출</p>
                </div>
              </div>
            </div>
          </div>
          {/* 카드 2 */}
          <div className="dashboard-visitor-insights-wrapper">
            <div className="dashboard-visitor-insights-background">
              <div className="dashboard-visitor-insights-header">
                <div className="dashboard-visitor-insights-title">
                  <p className="dashboard-visitor-insights-title-text">
                    접속 현황
                  </p>
                </div>
              </div>
              <div className="dashboard-visitor-insights-content">
                <div className="dashboard-visitor-insights-chart">chart</div>
                <div className="dashboard-visitor-insights-chart-value">
                  value chart
                </div>
              </div>
              <div className="dashboard-visitor-insights-legend">
                <div className="dashboard-legend-item">
                  <div className="dashboard-legend-color green"></div>
                  <p className="dashboard-legend-text">순 고객</p>
                </div>
              </div>
            </div>
          </div>
          {/* 카드 3 */}
          <div className="dashboard-revenue-wrapper">
            <div className="dashboard-revenue-background"></div>
            <div className="dashboard-revenue-header">
              <div className="dashboard-revenue-title">
                <p className="dashboard-revenue-title-text">총 수익</p>
              </div>
              <div className="dashboard-revenue-legend">
                <div className="dashboard-legend-item">
                  <div className="dashboard-legend-color blue"></div>
                  <p className="dashboard-legend-text">매출</p>
                </div>
              </div>
            </div>
            <div className="dashboard-revenue-chart">
              <div className="dashboard-chart-bar blue"></div>
              <div className="dashboard-chart-bar green"></div>
            </div>
          </div>
          {/* 카드 4 */}
          <div className="dashboard-customer-satisfaction-wrapper">
            <div className="dashboard-customer-satisfaction-background">
              <div className="dashboard-customer-satisfaction-header">
                <div className="dashboard-customer-satisfaction-title">
                  <p className="dashboard-customer-satisfaction-title-text">
                    고객 만족도
                  </p>
                </div>
              </div>
              <div className="dashboard-customer-satisfaction-legend">
                <div className="dashboard-legend-item">
                  <p className="dashboard-legend-text">이번 달</p>
                </div>
                <div className="dashboard-legend-item">
                  <p className="dashboard-legend-text">지난 달</p>
                </div>
              </div>
            </div>
          </div>
          {/* 카드 5 */}
          <div className="dashboard-target-reality-wrapper">
            <div className="dashboard-target-reality-background"></div>
            <div className="dashboard-target-reality-header">
              <div className="dashboard-target-reality-title">
                <p className="dashboard-target-reality-title-text">
                  목표 대비 실적
                </p>
              </div>
            </div>
            <div className="dashboard-target-reality-chart"></div>
            <div className="dashboard-target-reality-legend">
              <div className="dashboard-legend-item">
                <p className="dashboard-legend-value">value</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
