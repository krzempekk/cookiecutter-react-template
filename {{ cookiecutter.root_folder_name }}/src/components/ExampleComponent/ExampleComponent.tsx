import React, { FunctionComponent, Fragment, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import styles from "./ExampleComponent.module.scss";
import { useQuery } from "react-query";
import createTokenQuery from "commons/tokenQuery";
import axios from "axios";

export const ExampleComponent: FunctionComponent<{ useLogin: any }> = ({
  useLogin,
}) => {
  const { t } = useTranslation();

  // const { data, isFetching, error, requestLogin } = useLogin();
  //
  // console.log(data, isFetching, error);

  //   const { data } = useQuery(
  //   "exampleData",
  //   () =>
  //     new Promise((resolve, reject) =>
  //       setTimeout(() => reject({ some: "data" }), 1000)
  //     )
  // );
  // console.log(data);

  return (
    <Fragment>
      <h2 className={styles.example}>{t("TITLE")}</h2>
      <div>
        <Trans i18nKey="DESCRIPTION.PART_1">
          To get started, edit <code>src/App.js</code> and save to reload.
        </Trans>
      </div>
      {/*<button*/}
      {/*  onClick={() => requestLogin({ username: "admin", password: "admin" })}*/}
      {/*>*/}
      {/*  Login*/}
      {/*</button>*/}
      {/*<div>{JSON.stringify(data)}</div>*/}
    </Fragment>
  );
};
