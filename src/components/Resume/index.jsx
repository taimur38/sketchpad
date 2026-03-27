import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Resume() {
  return (
    <div className="resume-page">
      <div className="resume-header">
        <Link to="/" className="resume-back">&larr; Back</Link>
        <a href="/resume.pdf" download className="resume-download">Download PDF</a>
      </div>

      <div className="resume-card">
        <h1>Taimur Shah</h1>

        {/* ── Summary ── */}
        <h2>Professional Summary</h2>
        <ul className="summary-list">
          <li>Founded, led and built motivated teams both in the United States and internationally</li>
          <li>Development Economist with experience working with governments and international economic research centers</li>
          <li>Software Architect and Full-Stack Developer, with a decade of experience at both startups and Fortune 50 companies</li>
          <li>Passionate about communicating data-driven insights through visualization</li>
        </ul>

        {/* ── Education ── */}
        <h2>Education</h2>

        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">Harvard University, John F. Kennedy School of Government</span>
            <span className="entry-location">&mdash; Cambridge, MA</span>
          </div>
          <div className="entry-role">Master in Public Administration in International Development, GPA: 3.8 <span className="entry-date">May 2023</span></div>
          <div className="edu-detail">
            Rigorous and quantitatively intensive set of core classes in Development Economics. Personal focus on Macroeconomics, Climate Change, Energy Systems, Agriculture, and Social Enterprises.<br />
            Activities: Founder and President of the South Asia Caucus at HKS
          </div>
        </div>

        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">Columbia University, Fu Foundation School of Engineering and Applied Science</span>
            <span className="entry-location">&mdash; New York City, NY</span>
          </div>
          <div className="entry-role">Bachelor of Science, Major in Computer Science, GPA: 3.4 <span className="entry-date">May 2014</span></div>
          <div className="edu-detail">
            Focus on Computational Theory and Machine Learning<br />
            Minor in Economics — focus on Development Economics and Game Theory
          </div>
        </div>

        {/* ── Experience ── */}
        <h2>Experience</h2>

        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">Beaj</span>
            <span className="entry-location">&mdash; Cambridge, Massachusetts</span>
          </div>
          <div className="entry-role">Chief Technology Officer <span className="entry-date">October 2023 – Current</span></div>
          <div className="entry-body">
            <ul>
              <li>Define and lead Beaj's technology strategy, harnessing modern architectures, AI services, and conversational interfaces (e.g., WhatsApp bots) to scale impact and advance the organization's mission.</li>
            </ul>
          </div>
        </div>

        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">The Growth Lab at Harvard Kennedy School</span>
            <span className="entry-location">&mdash; Cambridge, Massachusetts</span>
          </div>
          <div className="entry-role">Research Fellow <span className="entry-date">August 2023 – Current</span></div>
          <div className="entry-body">
            <ul>
              <li>Co-authored a growth diagnostic of Morocco, focusing on climate and agriculture shocks, structural transformation and the inclusion of women in the economy.</li>
              <li>Co-authored a subnational growth diagnostic of Hermosillo, Mexico, focusing on the role of water in the economy. Integrated an understanding of spatial equilibrium into subnational growth diagnostics.</li>
              <li>Developed industrial policy strategy for the United Arab Emirates on Carbon Capture, Utilization and Storage to support Green Growth initiatives.</li>
              <li>Developed original research on Racial Inclusion in American cities using an Economic Complexity lens at the industry level. Designed and built digital tools to facilitate a racial inclusion diagnostics.</li>
            </ul>
          </div>
        </div>

        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">Agency for Strategic Planning and Reforms of the Republic of Kazakhstan</span>
            <span className="entry-location">&mdash; Astana, Kazakhstan</span>
          </div>
          <div className="entry-role">Economic Advisor <span className="entry-date">May 2022 – September 2022</span></div>
          <div className="entry-body">
            <ul>
              <li>Primary focus on developing Industrial Policy recommendations. Analyzed existing structure of state support for industry, identified areas for improvement and alignment with identified market failures.</li>
            </ul>
          </div>
        </div>

        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">Centre for Economic Research in Pakistan</span>
            <span className="entry-location">&mdash; Lahore, Pakistan</span>
          </div>
          <div className="entry-role">Associate Director, CERP Labs <span className="entry-date">July 2018 – May 2021</span></div>
          <div className="entry-body">
            <ul>
              <li>Founded the CERP Labs team, a revenue-generating software development unit within a research institution, focused on addressing issues that impede economic growth in developing countries.</li>
              <li>Built financially sustainable model, organizational capacity and trained a first-in-class software development team.</li>
              <li>Collaborated with research teams, private sector partners and international development organizations.</li>
              <li>Established and led projects in Education, Healthcare and COVID-19 related monitoring and economic recovery.</li>
              <li>Led product development and engineering across projects.</li>
            </ul>
            <div className="sub-projects">
              <div className="sub-project">
                <div className="sub-project-title">World Bank: Mapping Food Insecurity in Karachi</div>
                <div className="sub-project-desc">Designed, led and won proposal with the World Bank to build an interactive dashboard visualizing food insecurity hot-spots in informal settlements in Karachi.</div>
              </div>
              <div className="sub-project">
                <div className="sub-project-title">MISchool</div>
                <div className="sub-project-desc">Led product design and development of the School Management application targeting low-cost private schools in Pakistan. Rolled out to over 700 schools and 80,000 students across 6 districts of Punjab.</div>
              </div>
              <div className="sub-project">
                <div className="sub-project-title">IlmExchange</div>
                <div className="sub-project-desc">Led product development of an education platform addressing systemic constraints to education outcomes. Built a marketplace connecting low-cost private schools and education service providers, and an emergency student learning portal during COVID school closures.</div>
              </div>
              <div className="sub-project">
                <div className="sub-project-title">Economic Vulnerability Assessment</div>
                <div className="sub-project-desc">Conceptualized and advocated for a public assessment to quantify the economic impact of COVID-19 on populations in Punjab. Managed multi-round survey activity and produced multiple publicly distributed reports.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">IBM Watson</span>
            <span className="entry-location">&mdash; New York City, NY</span>
          </div>
          <div className="entry-role">Software Architect, Cognitive Environments <span className="entry-date">August 2014 – January 2018</span></div>
          <div className="entry-body">
            <p>Worked on over a dozen projects and products, ranging from architecting and building modern web applications, to researching, designing and building distributed, graphics-intensive applications on OpenGL.</p>
            <div className="sub-projects">
              <div className="sub-project">
                <div className="sub-project-title">CogEnv</div>
                <div className="sub-project-desc">Architected and led development of core software library and agents to manage distributed, multimodal inputs and outputs enriched by Watson.</div>
              </div>
              <div className="sub-project">
                <div className="sub-project-title">Election Explorer</div>
                <div className="sub-project-desc">Led development of knowledge graph service of political data around contributions, news, legislative activity and lobbyist info. Built interactive graph visualization for intuitive data traversal.</div>
              </div>
              <div className="sub-project">
                <div className="sub-project-title">Toomba</div>
                <div className="sub-project-desc">Designed, pitched and led development. Generates a knowledge graph from unstructured natural language using Watson services. Wrote plugins for Neo4J, SQL, Gremlin and Redis backends.</div>
              </div>
              <div className="sub-project">
                <div className="sub-project-title">Toombot</div>
                <div className="sub-project-desc">Authored and presented thesis on using AI as an agent-in-the-middle to enrich conversations between humans. Architected conversational framework leveraging Watson services.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">Parrable</span>
            <span className="entry-location">&mdash; New York City, NY</span>
          </div>
          <div className="entry-role">VP of Engineering <span className="entry-date">January 2013 – June 2014</span></div>
          <div className="entry-body">
            <ul>
              <li>Led data analysis and advertising operations for several clients.</li>
              <li>Full-stack developer. Converted Clossit backend and infrastructure to support business pivot from destination site to advertising.</li>
            </ul>
          </div>
        </div>

        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">Clossit</span>
            <span className="entry-location">&mdash; New York City, NY</span>
          </div>
          <div className="entry-role">Founder <span className="entry-date">October 2011 – January 2013</span></div>
          <div className="entry-body">
            <ul>
              <li>Consumer-facing site where users could browse a large database of clothes and curate personal collections shared with followers. The system learned user preferences and made recommendations accordingly.</li>
              <li>Full-stack developer building the site and apps.</li>
              <li>Successfully led the sale of the company to Parrable in 2013.</li>
            </ul>
          </div>
        </div>

        {/* ── Skills & Citizenship ── */}
        <h2>Skills & Other</h2>
        <p className="meta-row"><span className="meta-label">Languages:</span> English (native), Urdu (fluent)</p>
        <p className="meta-row"><span className="meta-label">Citizenship:</span> United States Citizenship; Pakistani NICOP holder.</p>
      </div>
    </div>
  );
}
