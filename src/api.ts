import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CoopInfo = {
  __typename?: 'CoopInfo';
  id: Scalars['ID'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  alias: Scalars['String'];
};

export type RepositoryCountData = {
  __typename?: 'RepositoryCountData';
  involvedCount: Scalars['Int'];
  ownerCount: Scalars['Int'];
};

export type Language = {
  __typename?: 'Language';
  name: Scalars['String'];
  color: Scalars['String'];
  size: Scalars['Int'];
  level: Scalars['Int'];
};

export type LanguagesTotal = {
  __typename?: 'LanguagesTotal';
  size: Scalars['Int'];
  level: Scalars['Int'];
};

export type LanguagesData = {
  __typename?: 'LanguagesData';
  involvedLanguages: Array<Language>;
  involvedLanguagesTotal: LanguagesTotal;
  ownerLanguages: Array<Language>;
  ownerLanguagesTotal: LanguagesTotal;
};

export type GithubAnalysis = {
  __typename?: 'GithubAnalysis';
  repositoryCountData: RepositoryCountData;
  languagesData: LanguagesData;
  id?: Maybe<Scalars['ID']>;
  login?: Maybe<Scalars['ID']>;
  savedAt?: Maybe<Scalars['String']>;
  syncedAt?: Maybe<Scalars['String']>;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  githubId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  githubInfo?: Maybe<CoopInfo>;
  githubAnalysis?: Maybe<GithubAnalysis>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** accountを取得 */
  account: Account;
  /** githubAnalysisを取得 */
  githubAnalysis: GithubAnalysis;
  /** githubAnalysisをloginで取得 */
  githubAnalysisByLogin: GithubAnalysis;
  /** 保存したgithubAnalysisの一覧を取得 */
  githubAnalysisLogs: GithubAnalysis;
};


export type QueryGithubAnalysisArgs = {
  id: Scalars['String'];
};


export type QueryGithubAnalysisByLoginArgs = {
  login: Scalars['String'];
};


export type QueryGithubAnalysisLogsArgs = {
  login: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** acountを更新 */
  updateAccount: Account;
  /** githubAnalysisを同期 */
  syncGithubAnalysis: GithubAnalysis;
};


export type MutationUpdateAccountArgs = {
  input: AccountInput;
};


export type MutationSyncGithubAnalysisArgs = {
  login: Scalars['String'];
};

export type AccountInput = {
  name: Scalars['String'];
};

export type AccountItemFragment = (
  { __typename?: 'Account' }
  & Pick<Account, 'id' | 'githubId' | 'name' | 'createdAt' | 'updatedAt'>
  & { githubAnalysis?: Maybe<(
    { __typename?: 'GithubAnalysis' }
    & GithubAnalysisItemFragment
  )> }
);

export type GithubAnalysisItemFragment = (
  { __typename?: 'GithubAnalysis' }
  & Pick<GithubAnalysis, 'login' | 'savedAt' | 'syncedAt'>
  & { repositoryCountData: (
    { __typename?: 'RepositoryCountData' }
    & Pick<RepositoryCountData, 'involvedCount' | 'ownerCount'>
  ), languagesData: (
    { __typename?: 'LanguagesData' }
    & { involvedLanguages: Array<(
      { __typename?: 'Language' }
      & LanguageItemFragment
    )>, involvedLanguagesTotal: (
      { __typename?: 'LanguagesTotal' }
      & LanguagesTotalItemFragment
    ), ownerLanguages: Array<(
      { __typename?: 'Language' }
      & LanguageItemFragment
    )>, ownerLanguagesTotal: (
      { __typename?: 'LanguagesTotal' }
      & LanguagesTotalItemFragment
    ) }
  ) }
);

export type LanguageItemFragment = (
  { __typename?: 'Language' }
  & Pick<Language, 'name' | 'color' | 'size' | 'level'>
);

export type LanguagesTotalItemFragment = (
  { __typename?: 'LanguagesTotal' }
  & Pick<LanguagesTotal, 'size' | 'level'>
);

export type UpdateAccountMutationVariables = Exact<{
  input: AccountInput;
}>;


export type UpdateAccountMutation = (
  { __typename?: 'Mutation' }
  & { updateAccount: (
    { __typename?: 'Account' }
    & Pick<Account, 'name'>
  ) }
);

export type SyncGithubAnalysisMutationVariables = Exact<{
  login: Scalars['String'];
}>;


export type SyncGithubAnalysisMutation = (
  { __typename?: 'Mutation' }
  & { syncGithubAnalysis: (
    { __typename?: 'GithubAnalysis' }
    & GithubAnalysisItemFragment
  ) }
);

export type AccountQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountQuery = (
  { __typename?: 'Query' }
  & { account: (
    { __typename?: 'Account' }
    & AccountItemFragment
  ) }
);

export type GithubAnalysisQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GithubAnalysisQuery = (
  { __typename?: 'Query' }
  & { githubAnalysis: (
    { __typename?: 'GithubAnalysis' }
    & GithubAnalysisItemFragment
  ) }
);

export type GithubAnalysisByLoginQueryVariables = Exact<{
  login: Scalars['String'];
}>;


export type GithubAnalysisByLoginQuery = (
  { __typename?: 'Query' }
  & { githubAnalysisByLogin: (
    { __typename?: 'GithubAnalysis' }
    & GithubAnalysisItemFragment
  ) }
);

export type GithubAnalysisLogsQueryVariables = Exact<{
  login: Scalars['String'];
}>;


export type GithubAnalysisLogsQuery = (
  { __typename?: 'Query' }
  & { githubAnalysisLogs: (
    { __typename?: 'GithubAnalysis' }
    & GithubAnalysisItemFragment
  ) }
);

export const LanguageItemFragmentDoc = gql`
    fragment LanguageItem on Language {
  name
  color
  size
  level
}
    `;
export const LanguagesTotalItemFragmentDoc = gql`
    fragment LanguagesTotalItem on LanguagesTotal {
  size
  level
}
    `;
export const GithubAnalysisItemFragmentDoc = gql`
    fragment GithubAnalysisItem on GithubAnalysis {
  login
  repositoryCountData {
    involvedCount
    ownerCount
  }
  languagesData {
    involvedLanguages {
      ...LanguageItem
    }
    involvedLanguagesTotal {
      ...LanguagesTotalItem
    }
    ownerLanguages {
      ...LanguageItem
    }
    ownerLanguagesTotal {
      ...LanguagesTotalItem
    }
  }
  savedAt
  syncedAt
}
    ${LanguageItemFragmentDoc}
${LanguagesTotalItemFragmentDoc}`;
export const AccountItemFragmentDoc = gql`
    fragment AccountItem on Account {
  id
  githubId
  name
  githubAnalysis {
    ...GithubAnalysisItem
  }
  createdAt
  updatedAt
}
    ${GithubAnalysisItemFragmentDoc}`;
export const UpdateAccountDocument = gql`
    mutation updateAccount($input: AccountInput!) {
  updateAccount(input: $input) {
    name
  }
}
    `;
export type UpdateAccountMutationFn = Apollo.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        return Apollo.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, baseOptions);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = Apollo.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = Apollo.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const SyncGithubAnalysisDocument = gql`
    mutation syncGithubAnalysis($login: String!) {
  syncGithubAnalysis(login: $login) {
    ...GithubAnalysisItem
  }
}
    ${GithubAnalysisItemFragmentDoc}`;
export type SyncGithubAnalysisMutationFn = Apollo.MutationFunction<SyncGithubAnalysisMutation, SyncGithubAnalysisMutationVariables>;

/**
 * __useSyncGithubAnalysisMutation__
 *
 * To run a mutation, you first call `useSyncGithubAnalysisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncGithubAnalysisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncGithubAnalysisMutation, { data, loading, error }] = useSyncGithubAnalysisMutation({
 *   variables: {
 *      login: // value for 'login'
 *   },
 * });
 */
export function useSyncGithubAnalysisMutation(baseOptions?: Apollo.MutationHookOptions<SyncGithubAnalysisMutation, SyncGithubAnalysisMutationVariables>) {
        return Apollo.useMutation<SyncGithubAnalysisMutation, SyncGithubAnalysisMutationVariables>(SyncGithubAnalysisDocument, baseOptions);
      }
export type SyncGithubAnalysisMutationHookResult = ReturnType<typeof useSyncGithubAnalysisMutation>;
export type SyncGithubAnalysisMutationResult = Apollo.MutationResult<SyncGithubAnalysisMutation>;
export type SyncGithubAnalysisMutationOptions = Apollo.BaseMutationOptions<SyncGithubAnalysisMutation, SyncGithubAnalysisMutationVariables>;
export const AccountDocument = gql`
    query account {
  account {
    ...AccountItem
  }
}
    ${AccountItemFragmentDoc}`;

/**
 * __useAccountQuery__
 *
 * To run a query within a React component, call `useAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccountQuery(baseOptions?: Apollo.QueryHookOptions<AccountQuery, AccountQueryVariables>) {
        return Apollo.useQuery<AccountQuery, AccountQueryVariables>(AccountDocument, baseOptions);
      }
export function useAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountQuery, AccountQueryVariables>) {
          return Apollo.useLazyQuery<AccountQuery, AccountQueryVariables>(AccountDocument, baseOptions);
        }
export type AccountQueryHookResult = ReturnType<typeof useAccountQuery>;
export type AccountLazyQueryHookResult = ReturnType<typeof useAccountLazyQuery>;
export type AccountQueryResult = Apollo.QueryResult<AccountQuery, AccountQueryVariables>;
export const GithubAnalysisDocument = gql`
    query githubAnalysis($id: String!) {
  githubAnalysis(id: $id) {
    ...GithubAnalysisItem
  }
}
    ${GithubAnalysisItemFragmentDoc}`;

/**
 * __useGithubAnalysisQuery__
 *
 * To run a query within a React component, call `useGithubAnalysisQuery` and pass it any options that fit your needs.
 * When your component renders, `useGithubAnalysisQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGithubAnalysisQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGithubAnalysisQuery(baseOptions?: Apollo.QueryHookOptions<GithubAnalysisQuery, GithubAnalysisQueryVariables>) {
        return Apollo.useQuery<GithubAnalysisQuery, GithubAnalysisQueryVariables>(GithubAnalysisDocument, baseOptions);
      }
export function useGithubAnalysisLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GithubAnalysisQuery, GithubAnalysisQueryVariables>) {
          return Apollo.useLazyQuery<GithubAnalysisQuery, GithubAnalysisQueryVariables>(GithubAnalysisDocument, baseOptions);
        }
export type GithubAnalysisQueryHookResult = ReturnType<typeof useGithubAnalysisQuery>;
export type GithubAnalysisLazyQueryHookResult = ReturnType<typeof useGithubAnalysisLazyQuery>;
export type GithubAnalysisQueryResult = Apollo.QueryResult<GithubAnalysisQuery, GithubAnalysisQueryVariables>;
export const GithubAnalysisByLoginDocument = gql`
    query githubAnalysisByLogin($login: String!) {
  githubAnalysisByLogin(login: $login) {
    ...GithubAnalysisItem
  }
}
    ${GithubAnalysisItemFragmentDoc}`;

/**
 * __useGithubAnalysisByLoginQuery__
 *
 * To run a query within a React component, call `useGithubAnalysisByLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useGithubAnalysisByLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGithubAnalysisByLoginQuery({
 *   variables: {
 *      login: // value for 'login'
 *   },
 * });
 */
export function useGithubAnalysisByLoginQuery(baseOptions?: Apollo.QueryHookOptions<GithubAnalysisByLoginQuery, GithubAnalysisByLoginQueryVariables>) {
        return Apollo.useQuery<GithubAnalysisByLoginQuery, GithubAnalysisByLoginQueryVariables>(GithubAnalysisByLoginDocument, baseOptions);
      }
export function useGithubAnalysisByLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GithubAnalysisByLoginQuery, GithubAnalysisByLoginQueryVariables>) {
          return Apollo.useLazyQuery<GithubAnalysisByLoginQuery, GithubAnalysisByLoginQueryVariables>(GithubAnalysisByLoginDocument, baseOptions);
        }
export type GithubAnalysisByLoginQueryHookResult = ReturnType<typeof useGithubAnalysisByLoginQuery>;
export type GithubAnalysisByLoginLazyQueryHookResult = ReturnType<typeof useGithubAnalysisByLoginLazyQuery>;
export type GithubAnalysisByLoginQueryResult = Apollo.QueryResult<GithubAnalysisByLoginQuery, GithubAnalysisByLoginQueryVariables>;
export const GithubAnalysisLogsDocument = gql`
    query githubAnalysisLogs($login: String!) {
  githubAnalysisLogs(login: $login) {
    ...GithubAnalysisItem
  }
}
    ${GithubAnalysisItemFragmentDoc}`;

/**
 * __useGithubAnalysisLogsQuery__
 *
 * To run a query within a React component, call `useGithubAnalysisLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGithubAnalysisLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGithubAnalysisLogsQuery({
 *   variables: {
 *      login: // value for 'login'
 *   },
 * });
 */
export function useGithubAnalysisLogsQuery(baseOptions?: Apollo.QueryHookOptions<GithubAnalysisLogsQuery, GithubAnalysisLogsQueryVariables>) {
        return Apollo.useQuery<GithubAnalysisLogsQuery, GithubAnalysisLogsQueryVariables>(GithubAnalysisLogsDocument, baseOptions);
      }
export function useGithubAnalysisLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GithubAnalysisLogsQuery, GithubAnalysisLogsQueryVariables>) {
          return Apollo.useLazyQuery<GithubAnalysisLogsQuery, GithubAnalysisLogsQueryVariables>(GithubAnalysisLogsDocument, baseOptions);
        }
export type GithubAnalysisLogsQueryHookResult = ReturnType<typeof useGithubAnalysisLogsQuery>;
export type GithubAnalysisLogsLazyQueryHookResult = ReturnType<typeof useGithubAnalysisLogsLazyQuery>;
export type GithubAnalysisLogsQueryResult = Apollo.QueryResult<GithubAnalysisLogsQuery, GithubAnalysisLogsQueryVariables>;