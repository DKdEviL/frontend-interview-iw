import React, { useState } from "react";
import SingleApplication from "./SingleApplication";
import styles from "./Applications.module.css";
import { Button } from "./ui/Button/Button";
import { useGetApplicationsData } from "./hooks/useGetApplicationsData";
import { AsyncStatus } from "./utilities/types";

const Applications = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { status, data } = useGetApplicationsData(pageNumber);

  const loadMoreHandler = () => {
    setPageNumber(pageNumber + 1);
  }

  return (
    <>
      {
        <div className={styles.Applications}>
          {data.map((application, index) => (
            <SingleApplication application={application} key={index} />
          ))}
        </div>
      }
      {status === AsyncStatus.InProgress && (
        <div className={styles.Center}>
          <div className={styles.Loader} />
        </div>
      )}
      {status === AsyncStatus.Error && alert("API ERROR")}
      <div className={styles.Center}>
        <Button
          className={undefined}
          onClick={loadMoreHandler}
        >
          Load More
        </Button>
      </div>
    </>
  );
};

export default Applications;
