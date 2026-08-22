/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Articles.css";

function Articles() {
    return (
        <div className="articles-section">
            <div className="articles-header">
                <div className="articles-pill">• Recent Blogs •</div>
                <h2 className="articles-heading">Stay Updated With Our <span>Latest Articles</span></h2>
            </div>
            
            <div className="articles-container">
                <div className="article-card">
                    <div className="article-img-wrapper">
                        <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400&h=250" alt="Glaucoma" />
                        <div className="article-date">
                            <strong>15</strong>
                            <span>May</span>
                        </div>
                    </div>
                    <div className="article-content">
                        <span className="article-tag">Treatments</span>
                        <h3>Understanding and Preventing Glaucoma: A Detailed Guide</h3>
                        <p>Glaucoma is a leading cause of blind worldwide, yet many....</p>
                        <a href="#" className="read-more">Read More</a>
                    </div>
                </div>

                <div className="article-card">
                    <div className="article-img-wrapper">
                        <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=250" alt="Neurology" />
                        <div className="article-date">
                            <strong>18</strong>
                            <span>May</span>
                        </div>
                    </div>
                    <div className="article-content">
                        <span className="article-tag">Neurology</span>
                        <h3>Neurology & Technology: A New Frontier in Brain</h3>
                        <p>Discover the intersection of technology and neurology, transforming....</p>
                        <a href="#" className="read-more">Read More</a>
                    </div>
                </div>
            </div>

            <div className="articles-footer">
                <button className="view-all-btn">View All Articles &gt;</button>
            </div>
        </div>
    );
}

export default Articles;
