import { FC } from "react";
import { Link } from "react-router-dom";
import Container from "../../../components/container/Container";
import "../nav/AdminSubNav.scss";

interface AdminSubNavProps {
  data: { title: string; to: string }[];
}

const AdminSubNav: FC<AdminSubNavProps> = ({ data }) => {
  return (
    <section>
      <Container>
        <ul className="sub-nav">
          {data.map((item) => (
            <li key={item.to}>
              <Link to={item.to}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
export default AdminSubNav;
